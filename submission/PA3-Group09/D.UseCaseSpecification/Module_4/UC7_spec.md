# STUDIFY
## Use-Case Specification: Use Pomodoro Timer

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Use Pomodoro Timer Use-Case Specification | `Group 09` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [User Pauses the Timer](#221-user-pauses-the-timer)
      2. [User Resets the Timer](#222-user-resets-the-timer)
      3. [User Customizes Timer Settings](#223-user-customizes-timer-settings)
      4. [User Skips a Break](#224-user-skips-a-break)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the process by which a User activates and interacts with the Pomodoro Timer, a productivity tool integrated into the STUDIFY application. The Pomodoro Technique divides study time into focused work intervals (typically 25 minutes) called "Pomodoros," separated by short breaks (typically 5 minutes). After a set number of Pomodoros, the User takes a longer break (typically 15–30 minutes). The timer helps the User maintain focus during flashcard creation and study sessions, and is available independently as a standalone utility.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User navigates to or opens the Pomodoro Timer widget/panel within the STUDIFY application.

1. The system displays the Pomodoro Timer interface, showing:
   - The current phase label (e.g., **"Focus"** or **"Short Break"** or **"Long Break"**).
   - A countdown display initialized to the configured duration (default: 25:00 for Focus).
   - A **Start** button.
   - A settings/configuration icon.
   - A Pomodoro counter (e.g., "Pomodoro 1 / 4").

2. The User clicks the **Start** button.

3. The system starts the countdown timer, decrementing one second at a time, and the Start button changes to a **Pause** button.

4. The system continues counting down while the User studies (e.g., reviews flashcards, creates cards).

5. When the Focus countdown reaches 00:00:
   - The system plays an audio alert and/or displays a visual notification: "Focus session complete! Time for a break."
   - The system increments the Pomodoro counter (e.g., "Pomodoro 1 completed").
   - The system automatically transitions to the **Short Break** phase and initializes the countdown to the configured break duration (default: 5:00).

6. The system starts the Short Break countdown automatically (or waits for the User to click Start, depending on settings).

7. When the Short Break countdown reaches 00:00:
   - The system plays an audio alert: "Break over! Ready to focus again?"
   - The system transitions back to the **Focus** phase.

8. The User repeats Steps 2–7 for the configured number of Pomodoros (default: 4).

9. After the 4th Pomodoro, the system transitions to a **Long Break** phase (default: 15:00) instead of a Short Break.

10. After the Long Break ends, the system resets the Pomodoro counter to 1 and returns to the Focus phase, ready for a new cycle.

11. The use case ends when the User stops or closes the timer.

---

### 2.2 Alternative Flows

#### 2.2.1 User Pauses the Timer

This alternative flow occurs when the User needs to temporarily suspend the countdown.

1. While the timer is running, the User clicks the **Pause** button.
2. The system halts the countdown and preserves the remaining time.
3. The Pause button changes to a **Resume** button.
4. When the User clicks **Resume**, the system restarts the countdown from the preserved time.
5. The flow resumes at Step 4 of the Basic Flow.

#### 2.2.2 User Resets the Timer

This alternative flow occurs when the User wants to restart the current phase from the beginning.

1. While the timer is running or paused, the User clicks the **Reset** button.
2. The system displays a confirmation: "Reset the current timer? Your current Pomodoro progress will not be counted."
3. If confirmed, the system resets the countdown to the full duration of the current phase (e.g., back to 25:00 for Focus) and stops the timer.
4. If not confirmed, the system returns to the timer's current state.
5. The flow returns to Step 2 of the Basic Flow (waiting for User to click Start).

#### 2.2.3 User Customizes Timer Settings

This alternative flow occurs when the User wants to change the default Pomodoro durations.

1. The User clicks the **Settings** icon on the Pomodoro Timer interface.
2. The system displays a settings panel with configurable fields:
   - **Focus Duration** (default: 25 minutes; range: 5–60 minutes).
   - **Short Break Duration** (default: 5 minutes; range: 1–15 minutes).
   - **Long Break Duration** (default: 15 minutes; range: 10–60 minutes).
   - **Pomodoros before Long Break** (default: 4; range: 2–8).
   - **Auto-start breaks** toggle (on/off).
   - **Notification sound** toggle (on/off).
3. The User modifies the desired settings and clicks **Save**.
4. The system saves the settings and applies them from the next timer cycle.
5. The system closes the settings panel and returns to the timer interface.
6. If the timer is currently running, the new settings take effect at the start of the next phase.
7. The flow resumes at the current step of the Basic Flow.

#### 2.2.4 User Skips a Break

This alternative flow occurs when the User wants to skip a scheduled break and return to focusing immediately.

1. During a Short Break or Long Break phase, the User clicks the **"Skip Break"** button.
2. The system immediately ends the break countdown.
3. The system transitions to the next **Focus** phase and initializes the countdown.
4. The flow resumes at Step 3 of the Basic Flow.

---

## 3. Special Requirements

### 3.1 Usability Requirements

- The Pomodoro Timer must be accessible as a floating widget or side panel so it does not obstruct the main study content.
- The current phase (Focus, Short Break, Long Break) must be clearly communicated through distinct color schemes (e.g., red for Focus, green for Break).
- The countdown must be clearly legible at a glance (large, high-contrast font).
- The timer must be usable across the application without requiring the User to navigate away from their current task.

### 3.2 Performance Requirements

- The timer countdown must be accurate to within ±1 second over a 25-minute session.
- The timer must continue functioning if the User switches between tabs or minimizes the browser window (using Web Workers or equivalent background execution).

### 3.3 Notification Requirements

- The system must support browser-level push notifications for timer completions, so the User is alerted even if the STUDIFY tab is not in focus.
- Audio alerts must be accompanied by a visual notification for users with hearing impairments.
- All notification sounds must be opt-in (disabled by default with the option to enable).

### 3.4 Persistence Requirements

- The User's timer settings (Focus duration, break durations, preferences) must be persisted across sessions.
- If the User closes the browser while a timer is running, the system should resume from the correct phase upon return, if technically feasible.

---

## 4. Preconditions

### 4.1 User Authentication

- The User must be authenticated (logged in) to the STUDIFY system.

### 4.2 Pomodoro Module Availability

- The Pomodoro Timer feature must be enabled and accessible in the User's current application context.

---

## 5. Postconditions

### 5.1 Completed Pomodoro Cycle

After a full Pomodoro cycle is completed:

- The User's Pomodoro session count for the day is incremented and recorded (for study statistics/gamification purposes).
- The system logs the total focus time accumulated during the session.

### 5.2 Timer Stopped Mid-Session

If the User stops the timer before completing a full Pomodoro:

- The incomplete Pomodoro is not counted.
- Any accumulated focus time during the current (incomplete) Pomodoro may still be logged as partial study time.

### 5.3 Settings Updated

If the User modified timer settings during the session:

- The new settings are saved and will be applied to all future Pomodoro sessions.

---

## 6. Extension Points

### 6.1 Browser Notification

The browser notification system is triggered at the end of each phase (Focus or Break) when the countdown reaches zero, alerting the User even when they are not actively looking at the STUDIFY application.
