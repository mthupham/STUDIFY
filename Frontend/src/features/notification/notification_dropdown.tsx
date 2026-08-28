import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthStore } from "../auth/store/useAuthStore";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface Notification {
  id: string;
  type: "LESSON_INCOMPLETE" | "LESSON_UNLOCKED";
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = useAuthStore((state) => state.token);

  // Hàm gọi API lấy danh sách notifications
  const fetchNotifications = async (showLoader = false) => {
    if (!token) return;
    if (showLoader) setLoading(true);
    
    try {
      const { data } = await axios.get(`${API_BASE}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const responseData = data.data || data;
      const notifs: Notification[] = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData?.notifications)
          ? responseData.notifications
          : [];
      setNotifications(notifs);
      setUnreadCount(
        typeof responseData?.unreadCount === "number"
          ? responseData.unreadCount
          : notifs.filter((n) => !n.isRead).length,
      );
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Polling mỗi 30 giây để kiểm tra thông báo mới
  useEffect(() => {
    fetchNotifications(); // Lần đầu tiên

    const handleLessonCompleted = () => {
      fetchNotifications();
    };

    window.addEventListener("lesson-completed", handleLessonCompleted);

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000); // 30s

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("lesson-completed", handleLessonCompleted);
    };
  }, [token]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gọi API mark-as-read (Tùy chọn nếu backend của bạn có hỗ trợ)
  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.patch(`${API_BASE}/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications(); // Refresh lại danh sách
    } catch (error) {
      console.error("Lỗi khi mark as read", error);
    }
  };

  // Hàm render Icon dựa theo loại Notification
  const renderIcon = (type: string) => {
    switch (type) {
      case "LESSON_UNLOCKED":
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
          </div>
        );
      case "LESSON_INCOMPLETE":
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <div className="h-2 w-2 rounded-full bg-slate-400"></div>
          </div>
        );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Nút Chuông */}
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications(true); // Lấy data mới nhất khi mở ra
        }}
        aria-label="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z" fill="#424754"/>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow ring-2 ring-white">
          </span>
        )}
      </button>

      {/* Bảng Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[340px] md:w-[380px] origin-top-right rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 z-[300] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="flex max-h-[400px] flex-col overflow-y-auto overscroll-contain">
            {loading && notifications.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <span className="text-sm text-slate-500">Loading...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <div className="mb-3 h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <p className="text-sm font-medium text-slate-900">You're all caught up!</p>
                <p className="text-xs text-slate-500 mt-1">No new notifications at the moment.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition cursor-pointer ${!notification.isRead ? 'bg-sky-50/30' : ''}`}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  {renderIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-slate-900 leading-snug">
                      {notification.type === 'LESSON_UNLOCKED' ? 'New Lesson Unlocked!' : 'Lesson Incomplete'}
                    </p>
                    <p className="text-sm text-slate-600 leading-snug">
                      {notification.message}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString()} {/* Có thể dùng thư viện date-fns để format "2 mins ago" */}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2.5 w-2.5 rounded-full bg-sky-600 shrink-0 mt-1.5 shadow-sm"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
