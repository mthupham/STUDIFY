import { create } from "zustand";

export type TimerMode = "focus" | "break";

interface PomodoroStorage {
  focusTime: number;
  breakTime: number;
  mode: TimerMode;
  completedSessions: number;
  isRunning: boolean;
  endTime: number | null;
  totalTime: number;
  timeLeft: number;
}

export interface PomodoroStoreState {
  // State
  focusTime: number;
  breakTime: number;
  mode: TimerMode;
  totalTime: number;
  timeLeft: number;
  isRunning: boolean;
  completedSessions: number;
  dailyGoal: number;
  endTime: number | null;

  // Derived / UI properties
  formattedTime: string;
  radius: number;
  circumference: number;
  strokeDashoffset: number;

  // Actions
  toggleTimer: () => void;
  resetTimer: () => void;
  adjustFocus: (delta: number) => void;
  adjustBreak: (delta: number) => void;
  requestNotificationPermission: () => void;
}

const STORAGE_KEY = "pomodoro-timer";
let timerInterval: ReturnType<typeof setInterval> | null = null;

// --- HELPER 1: PHÁT ÂM THANH BẰNG WEB AUDIO API ---
const playAlarmSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    [0, 0.2, 0.4].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + delay + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.15);
    });
  } catch (e) {
    console.error("Audio Playback Error:", e);
  }
};

// --- HELPER 2: THÔNG BÁO TRÌNH DUYỆT ---
const sendNotification = (title: string, body: string) => {
  playAlarmSound();
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/favicon.ico",
    });
  }
};

// --- HELPER 3: TÍNH TOÁN CÁC BIẾN UI/SVG ---
const calculateDerived = (timeLeft: number, totalTime: number) => {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return { formattedTime, radius, circumference, strokeDashoffset };
};

// --- HELPER 4: ĐỌC DỮ LIỆU TỪ LOCAL STORAGE ---
const getInitialStorage = (initialFocus = 25, initialBreak = 5): PomodoroStorage => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data: PomodoroStorage = JSON.parse(saved);
      // Khi reload trang, luôn mặc định chuyển về mode Focus
      const defaultTotal = (data.focusTime || initialFocus) * 60;
      return {
        focusTime: data.focusTime || initialFocus,
        breakTime: data.breakTime || initialBreak,
        mode: "focus",
        completedSessions: data.completedSessions || 0,
        isRunning: false,
        endTime: null,
        totalTime: defaultTotal,
        timeLeft: defaultTotal,
      };
    } catch (e) {
      console.error("Failed to parse pomodoro storage", e);
    }
  }

  const defaultTotal = initialFocus * 60;
  return {
    focusTime: initialFocus,
    breakTime: initialBreak,
    mode: "focus",
    completedSessions: 0,
    isRunning: false,
    endTime: null,
    totalTime: defaultTotal,
    timeLeft: defaultTotal,
  };
};

const initialData = getInitialStorage();
const initialDerived = calculateDerived(initialData.timeLeft, initialData.totalTime);

// =========================================================================
// ZUSTAND STORE
// =========================================================================
export const usePomodoroStore = create<PomodoroStoreState>((set, get) => {
  const updateStorageAndTitle = (state: Partial<PomodoroStoreState>) => {
    const currentState = { ...get(), ...state };

    const storageData: PomodoroStorage = {
      focusTime: currentState.focusTime,
      breakTime: currentState.breakTime,
      mode: currentState.mode,
      completedSessions: currentState.completedSessions,
      isRunning: currentState.isRunning,
      endTime: currentState.endTime,
      totalTime: currentState.totalTime,
      timeLeft: currentState.timeLeft,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));

    if (currentState.isRunning) {
      const modeLabel = currentState.mode === "focus" ? "Focus" : "Break";
      document.title = `(${currentState.formattedTime}) ${modeLabel} - Studify`;
    } else {
      document.title = "Studify";
    }
  };

  const stopInterval = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const handleTimerComplete = () => {
    const { mode, completedSessions, dailyGoal, breakTime, focusTime } = get();

    if (mode === "focus") {
      const newSessions = Math.min(completedSessions + 1, dailyGoal);
      sendNotification(
        "🎉 Hết giờ tập trung!",
        "Đã đến lúc nghỉ ngơi rồi. Hệ thống đã tự động bật Break Time!"
      );

      const breakSecs = breakTime * 60;
      const finish = Date.now() + breakSecs * 1000;
      const derived = calculateDerived(breakSecs, breakSecs);

      const nextState = {
        mode: "break" as TimerMode,
        completedSessions: newSessions,
        totalTime: breakSecs,
        timeLeft: breakSecs,
        endTime: finish,
        isRunning: true,
        ...derived,
      };

      set(nextState);
      updateStorageAndTitle(nextState);
    } else {
      sendNotification(
        "⚡ Hết giờ nghỉ ngơi!",
        "Cùng quay lại làm việc thôi! Hệ thống đã tự động bật Focus Session!"
      );

      const focusSecs = focusTime * 60;
      const finish = Date.now() + focusSecs * 1000;
      const derived = calculateDerived(focusSecs, focusSecs);

      const nextState = {
        mode: "focus" as TimerMode,
        totalTime: focusSecs,
        timeLeft: focusSecs,
        endTime: finish,
        isRunning: true,
        ...derived,
      };

      set(nextState);
      updateStorageAndTitle(nextState);
    }
  };

  const startInterval = () => {
    stopInterval();

    // Chạy kiểm tra mỗi 200ms để đảm bảo đếm chính xác từng giây
    timerInterval = setInterval(() => {
      const { endTime, totalTime } = get();
      if (!endTime) return;

      // SỬA LỖI: Dùng Math.ceil thay vì Math.floor
      const remain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      const derived = calculateDerived(remain, totalTime);

      if (remain === 0) {
        handleTimerComplete();
      } else {
        const nextState = { timeLeft: remain, ...derived };
        set(nextState);
        updateStorageAndTitle(nextState);
      }
    }, 200);
  };

  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      const { isRunning, endTime, totalTime } = get();
      if (document.visibilityState === "visible" && isRunning && endTime) {
        const remain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        const derived = calculateDerived(remain, totalTime);

        if (remain === 0) {
          handleTimerComplete();
        } else {
          const nextState = { timeLeft: remain, ...derived };
          set(nextState);
          updateStorageAndTitle(nextState);
        }
      }
    });
  }

  return {
    focusTime: initialData.focusTime,
    breakTime: initialData.breakTime,
    mode: initialData.mode,
    totalTime: initialData.totalTime,
    timeLeft: initialData.timeLeft,
    isRunning: initialData.isRunning,
    completedSessions: initialData.completedSessions,
    dailyGoal: 4,
    endTime: initialData.endTime,
    ...initialDerived,

    requestNotificationPermission: () => {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    },

    toggleTimer: () => {
      get().requestNotificationPermission();
      const { isRunning, timeLeft, mode, focusTime, breakTime } = get();

      if (isRunning) {
        stopInterval();
        const nextState = { isRunning: false, endTime: null };
        set(nextState);
        updateStorageAndTitle(nextState);
      } else {
        const currentTotal = (mode === "focus" ? focusTime : breakTime) * 60;
        const finish = Date.now() + timeLeft * 1000;
        const nextState = { isRunning: true, endTime: finish, totalTime: currentTotal };

        set(nextState);
        updateStorageAndTitle(nextState);
        startInterval();
      }
    },

    // Reset luôn quay về Mode Focus
    resetTimer: () => {
      stopInterval();
      const { focusTime } = get();
      const seconds = focusTime * 60;
      const derived = calculateDerived(seconds, seconds);

      const nextState = {
        mode: "focus" as TimerMode,
        isRunning: false,
        endTime: null,
        totalTime: seconds,
        timeLeft: seconds,
        ...derived,
      };

      set(nextState);
      updateStorageAndTitle(nextState);
    },

    adjustFocus: (delta: number) => {
      const { isRunning, mode, focusTime } = get();
      if (isRunning) return;

      let newFocus = focusTime;
      if (delta > 0) {
        newFocus = focusTime === 1 ? 5 : Math.min(60, focusTime + 5);
      } else {
        newFocus = focusTime <= 5 ? 1 : focusTime - 5;
      }

      const seconds = newFocus * 60;
      const derived = mode === "focus" ? calculateDerived(seconds, seconds) : {};

      const nextState = {
        focusTime: newFocus,
        ...(mode === "focus"
          ? { totalTime: seconds, timeLeft: seconds, ...derived }
          : {}),
      };

      set(nextState);
      updateStorageAndTitle(nextState);
    },

    adjustBreak: (delta: number) => {
      const { isRunning, mode, breakTime } = get();
      if (isRunning) return;

      const newBreak = Math.max(1, Math.min(30, breakTime + delta));
      const seconds = newBreak * 60;
      const derived = mode === "break" ? calculateDerived(seconds, seconds) : {};

      const nextState = {
        breakTime: newBreak,
        ...(mode === "break"
          ? { totalTime: seconds, timeLeft: seconds, ...derived }
          : {}),
      };

      set(nextState);
      updateStorageAndTitle(nextState);
    },
  };
});

export default usePomodoroStore;