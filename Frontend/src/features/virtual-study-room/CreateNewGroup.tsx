import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createGroup } from "./services/groupService";
import { useAuthStore } from "../auth/store/useAuthStore";

// ==========================================
// 1. DANH SÁCH ICON TÙY CHỌN DÙNG CHUNG
// ==========================================
interface IconOption {
  id: string;
  name: string;
  icon: (className: string) => React.ReactNode;
}

const ALL_ICONS: IconOption[] = [
  {
    id: "rocket",
    name: "Rocket",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 4.13H5a6 6 0 006-6v-.52M15 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
  },
  {
    id: "books",
    name: "Books",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "graduation",
    name: "Graduation",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
  },
  {
    id: "lightbulb",
    name: "Light Bulb",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: "laptop",
    name: "Laptop",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "target",
    name: "Target",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "brain",
    name: "Brain",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 29 30" fill="currentColor">
        <path d="M4.5 30V23.55C3.075 22.25 1.96875 20.7312 1.18125 18.9937C0.39375 17.2563 0 15.425 0 13.5C0 9.75 1.3125 6.5625 3.9375 3.9375C6.5625 1.3125 9.75 0 13.5 0C16.625 0 19.3937 0.91875 21.8062 2.75625C24.2188 4.59375 25.7875 6.9875 26.5125 9.9375L28.4625 17.625C28.5875 18.1 28.5 18.5312 28.2 18.9188C27.9 19.3063 27.5 19.5 27 19.5H24V24C24 24.825 23.7062 25.5312 23.1187 26.1187C22.5312 26.7062 21.825 27 21 27H18V30H15V24H21V16.5H25.05L23.625 10.6875C23.05 8.4125 21.825 6.5625 19.95 5.1375C18.075 3.7125 15.925 3 13.5 3C10.6 3 8.125 4.0125 6.075 6.0375C4.025 8.0625 3 10.525 3 13.425C3 14.925 3.30625 16.35 3.91875 17.7C4.53125 19.05 5.4 20.25 6.525 21.3L7.5 22.2V30H4.5ZM12 19.5H15L15.225 17.625C15.425 17.55 15.6062 17.4625 15.7688 17.3625C15.9313 17.2625 16.075 17.15 16.2 17.025L17.925 17.775L19.425 15.225L17.925 14.1C17.975 13.9 18 13.7 18 13.5C18 13.3 17.975 13.1 17.925 12.9L19.425 11.775L17.925 9.225L16.2 9.975C16.075 9.85 15.9313 9.7375 15.7688 9.6375C15.6062 9.5375 15.425 9.45 15.225 9.375L15 7.5H12L11.775 9.375C11.575 9.45 11.3938 9.5375 11.2312 9.6375C11.0687 9.7375 10.925 9.85 10.8 9.975L9.075 9.225L7.575 11.775L9.075 12.9C9.025 13.1 9 13.3 9 13.5C9 13.7 9.025 13.9 9.075 14.1L7.575 15.225L9.075 17.775L10.8 17.025C10.925 17.15 11.0687 17.2625 11.2312 17.3625C11.3938 17.4625 11.575 17.55 11.775 17.625L12 19.5ZM13.5 15.75C12.875 15.75 12.3438 15.5312 11.9062 15.0938C11.4688 14.6562 11.25 14.125 11.25 13.5C11.25 12.875 11.4688 12.3438 11.9062 11.9062C12.3438 11.4688 12.875 11.25 13.5 11.25C14.125 11.25 14.6562 11.4688 15.0938 11.9062C15.5312 12.3438 15.75 12.875 15.75 13.5C15.75 14.125 15.5312 14.6562 15.0938 15.0938C14.6562 15.5312 14.125 15.75 13.5 15.75Z" />
      </svg>
    ),
  },
  {
    id: "notes",
    name: "Notes",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "global",
    name: "Global",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    id: "library",
    name: "Library",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
        />
      </svg>
    ),
  },
  {
    id: "quiz",
    name: "Quiz",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 30 30" fill="currentColor">
        <path d="M18 19.5C18.425 19.5 18.7938 19.3438 19.1063 19.0312C19.4188 18.7188 19.575 18.35 19.575 17.925C19.575 17.5 19.4188 17.1313 19.1063 16.8188C18.7938 16.5063 18.425 16.35 18 16.35C17.575 16.35 17.2062 16.5063 16.8937 16.8188C16.5812 17.1313 16.425 17.5 16.425 17.925C16.425 18.35 16.5812 18.7188 16.8937 19.0312C17.2062 19.3438 17.575 19.5 18 19.5ZM16.875 14.7H19.125C19.125 13.975 19.2 13.4437 19.35 13.1062C19.5 12.7688 19.85 12.325 20.4 11.775C21.15 11.025 21.65 10.4187 21.9 9.95625C22.15 9.49375 22.275 8.95 22.275 8.325C22.275 7.2 21.8813 6.28125 21.0938 5.56875C20.3062 4.85625 19.275 4.5 18 4.5C16.975 4.5 16.0813 4.7875 15.3188 5.3625C14.5563 5.9375 14.025 6.7 13.725 7.65L15.75 8.475C15.975 7.85 16.2812 7.38125 16.6688 7.06875C17.0563 6.75625 17.5 6.6 18 6.6C18.6 6.6 19.0875 6.76875 19.4625 7.10625C19.8375 7.44375 20.025 7.9 20.025 8.475C20.025 8.825 19.925 9.15625 19.725 9.46875C19.525 9.78125 19.175 10.175 18.675 10.65C17.85 11.375 17.3438 11.9437 17.1562 12.3562C16.9688 12.7688 16.875 13.55 16.875 14.7ZM9 24C8.175 24 7.46875 23.7062 6.88125 23.1187C6.29375 22.5312 6 21.825 6 21V3C6 2.175 6.29375 1.46875 6.88125 0.88125C7.46875 0.29375 8.175 0 9 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H9ZM9 21H27V3H9V21ZM3 30C2.175 30 1.46875 29.7062 0.88125 29.1187C0.29375 28.5312 0 27.825 0 27V6H3V27H24V30H3ZM9 3V21V3Z" />
      </svg>
    ),
  },
  {
    id: "culture",
    name: "Culture",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 30 30" fill="currentColor">
        <path d="M15 30C12.925 30 10.975 29.6063 9.15 28.8188C7.325 28.0312 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.96875 22.675 1.18125 20.85C0.39375 19.025 0 17.075 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.96875 9.15 1.18125C10.975 0.39375 12.925 0 15 0C17.075 0 19.025 0.39375 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0312 7.325 28.8188 9.15C29.6063 10.975 30 12.925 30 15C30 17.075 29.6063 19.025 28.8188 20.85C28.0312 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0312 20.85 28.8188C19.025 29.6063 17.075 30 15 30ZM13.5 26.925V24C12.675 24 11.9688 23.7062 11.3813 23.1187C10.7938 22.5312 10.5 21.825 10.5 21V19.5L3.3 12.3C3.225 12.75 3.15625 13.2 3.09375 13.65C3.03125 14.1 3 14.55 3 15C3 18.025 3.99375 20.675 5.98125 22.95C7.96875 25.225 10.475 26.55 13.5 26.925ZM23.85 23.1C24.875 21.975 25.6562 20.7188 26.1938 19.3312C26.7313 17.9437 27 16.5 27 15C27 12.55 26.3187 10.3125 24.9562 8.2875C23.5938 6.2625 21.775 4.8 19.5 3.9V4.5C19.5 5.325 19.2062 6.03125 18.6187 6.61875C18.0312 7.20625 17.325 7.5 16.5 7.5H13.5V10.5C13.5 10.925 13.3563 11.2812 13.0688 11.5688C12.7812 11.8563 12.425 12 12 12H9V15H18C18.425 15 18.7812 15.1437 19.0688 15.4312C19.3563 15.7188 19.5 16.075 19.5 16.5V21H21C21.65 21 22.2375 21.1937 22.7625 21.5812C23.2875 21.9688 23.65 22.475 23.85 23.1Z" />
      </svg>
    ),
  },
];

// ==========================================
// 2. POP-UP MODAL CHỌN ICON
// ==========================================
interface IconModalProps {
  isOpen: boolean;
  selectedIconId: string;
  onClose: () => void;
  onSelectIcon: (id: string) => void;
}

function IconCustomizationModal({
  isOpen,
  selectedIconId,
  onClose,
  onSelectIcon,
}: IconModalProps) {
  const [tempSelectedId, setTempSelectedId] = useState<string>(selectedIconId);
  const [searchQuery, setSearchQuery] = useState<string>("");

  React.useEffect(() => {
    if (isOpen) {
      setTempSelectedId(selectedIconId);
      setSearchQuery("");
    }
  }, [isOpen, selectedIconId]);

  const filteredIcons = useMemo(() => {
    return ALL_ICONS.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSelectIcon(tempSelectedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 font-['Inter']">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Choose Group Icon
            </h2>
            <p className="text-xs text-gray-600 font-medium">
              Select an icon that best represents your group theme
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search education icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
            />
            <svg
              className="w-4 h-4 absolute left-3.5 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="p-6 max-h-[300px] overflow-y-auto">
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filteredIcons.map((item) => {
                const isSelected = item.id === tempSelectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTempSelectedId(item.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-sky-50 border-sky-600 text-sky-700 ring-2 ring-sky-600/30 font-bold"
                        : "bg-white border-slate-200 text-gray-700 hover:border-slate-300 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.icon(
                      isSelected
                        ? "w-7 h-7 text-sky-700"
                        : "w-7 h-7 text-gray-600",
                    )}
                    <span className="mt-2 text-xs tracking-tight text-center leading-tight">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-5 text-center text-gray-500">
              <p className="text-sm font-medium">No icons found.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-slate-50/80 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-sky-700 text-sky-700 hover:bg-sky-50 text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 rounded-full bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. COMPONENT CHÍNH: CREATE STUDY GROUP PAGE
// ==========================================
export default function CreateStudyGroupPage() {
  const navigate = useNavigate();
  const { token: storeToken } = useAuthStore();

  // Form State
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIconId, setSelectedIconId] = useState("books");
  const [groupCode, setGroupCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Feedback State
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedIconObj =
    ALL_ICONS.find((item) => item.id === selectedIconId) || ALL_ICONS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setMessage("Please enter a group name.");
      setMessageType("error");
      return;
    }

    // Ưu tiên lấy token từ localStorage
    const token = localStorage.getItem("accessToken") || storeToken;

    if (!token) {
      setMessage("Your session has expired. Please log in again.");
      setMessageType("error");
      return;
    }

    try {
      setIsCreating(true);
      setMessage("");
      setMessageType("");

      // Backend NestJS DTO chỉ nhận field `name`
      const response = await createGroup(
        token,
        groupName.trim(),
        description.trim() || null,
        selectedIconId,
      );

      const createdGroup = response.data.data.group;
      const codeFromBackend = createdGroup.code;

      if (codeFromBackend) {
        setGroupCode(codeFromBackend);
      }

      setMessage(
        response.data.message ||
          `Group "${createdGroup.name}" created successfully!`,
      );
      setMessageType("success");

      setTimeout(() => {
        navigate("/study-groups");
      }, 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;

        let errorText = "Failed to create group. Please try again.";

        if (status === 400) {
          errorText = Array.isArray(backendMessage)
            ? backendMessage.join(", ")
            : backendMessage || "Invalid data submitted.";
        } else if (status === 401) {
          errorText = "Your session has expired. Please log in again.";
        } else if (status === 409) {
          errorText = backendMessage || "Group already exists.";
        } else if (status === 500) {
          errorText = "Internal server error. Please try again later.";
        } else if (backendMessage) {
          errorText = Array.isArray(backendMessage)
            ? backendMessage.join(", ")
            : backendMessage;
        }

        setMessage(errorText);
      } else {
        setMessage("Failed to create group. Please try again.");
      }

      setMessageType("error");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-['Inter'] text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER SECTION */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate("/study-groups")}
            className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sky-700 text-sm font-semibold transition-all duration-200 hover:bg-sky-50 hover:text-sky-800 hover:-translate-x-1 active:scale-95"
          >
            <svg
              className="w-4 h-4 stroke-current transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Groups
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Create New Study Group
          </h1>
          <p className="text-gray-600 text-base">
            Build a community to practice English with peers and share
            resources.
          </p>
        </div>

        {/* FORM & SIDEBAR GRID */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* CỘT TRÁI: FORM CHÍNH */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group Name */}
              <div className="space-y-2">
                <label
                  htmlFor="groupName"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="groupName"
                  type="text"
                  required
                  placeholder="e.g. Advanced Business English"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Short Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  maxLength={250}
                  placeholder="Briefly describe the purpose of this group and who should join..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all text-sm resize-none"
                />
                <div className="text-right text-xs text-gray-500 font-medium">
                  {description.length} / 250 characters
                </div>
              </div>
            </div>

            {/* Access Code Display */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-sky-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3 className="text-sm font-semibold text-gray-900">
                  Access & Permissions
                </h3>
              </div>

              <div className="p-6 bg-violet-50/70 border border-violet-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-semibold text-gray-900">
                    Group Access Code
                  </h4>
                  <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                    This unique code will be automatically generated by the
                    system when you create the group.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                  <div className="h-12 px-6 bg-white border-2 border-sky-600/30 rounded-xl flex items-center justify-center text-sky-700 font-mono text-2xl font-bold tracking-widest shadow-sm min-w-[140px]">
                    {groupCode || "AUTO"}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-3 py-2 rounded-lg">
                    Generated on Creation
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-4">
              <button
                onClick={() => navigate("/study-groups")}
                type="button"
                className="px-6 py-3 rounded-xl border border-sky-700 text-sky-700 hover:bg-sky-50 text-sm font-semibold transition-colors cursor-pointer"
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-8 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 disabled:bg-sky-400 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                {isCreating ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Group</span>
                )}
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 rounded-lg border px-4 py-3 text-sm font-medium ${
                  messageType === "success"
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-red-300 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* CỘT PHẢI: SIDEBAR & PREVIEW */}
          <div className="space-y-6">
            <div className="bg-indigo-50/50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
              <h3 className="w-full text-left text-sm font-semibold text-gray-900">
                Group Icon Preview
              </h3>

              {/* AVATAR PREVIEW */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-600 text-white flex items-center justify-center border-4 border-white shadow-md hover:opacity-90 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-200"
                  title="Click to change icon"
                >
                  {selectedIconObj.icon("w-12 h-12")}
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-0 right-0 w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-slate-100 active:scale-95 transition-all text-sky-700 cursor-pointer"
                  title="Edit icon"
                >
                  <svg
                    className="w-4 h-4 text-sky-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>

              {/* Danh sách xem nhanh 4 Icon gần đây */}
              <div className="flex items-center justify-center gap-2">
                {ALL_ICONS.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIconId(item.id)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      selectedIconId === item.id
                        ? "bg-blue-600 text-white ring-2 ring-sky-600 ring-offset-2"
                        : "bg-white text-gray-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                    title={item.name}
                  >
                    {item.icon("w-5 h-5")}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Click the pencil icon above to search and customize your group
                icon.
              </p>
            </div>

            {/* Card Mentor's Advice */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-6 flex gap-3.5 items-start text-amber-900">
              <svg
                className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-amber-800 text-sm">
                  Mentor&apos;s Advice
                </h4>
                <p className="leading-relaxed text-amber-900/90">
                  &quot;Successful study groups usually focus on a specific
                  skill level or goal. Keep your group name descriptive to help
                  relevant learners find you easily!&quot;
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* POP-UP MODAL TÙY CHỌN ICON */}
      <IconCustomizationModal
        isOpen={isModalOpen}
        selectedIconId={selectedIconId}
        onClose={() => setIsModalOpen(false)}
        onSelectIcon={(newId) => setSelectedIconId(newId)}
      />
    </div>
  );
}
