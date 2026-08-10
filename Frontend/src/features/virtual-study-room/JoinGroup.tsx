import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../auth/store/useAuthStore";

// ==========================================
// COMPONENT CHÍNH: JOIN GROUP CARD
// ==========================================

export default function JoinGroupPage() {
  const navigate = useNavigate();
  // State quản lý mã truy cập (Group Access Code)
  const [accessCode, setAccessCode] = useState("");

  // Hàm xử lý chỉ cho phép nhập tối đa 6 ký tự số và tự động định dạng
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Chỉ lấy chữ số
    if (rawValue.length <= 6) {
      setAccessCode(rawValue);
    }
  };

  // Định dạng hiển thị mã dạng "XXX-XXX"
  const formattedCode =
    accessCode.length > 3
      ? `${accessCode.slice(0, 3)}-${accessCode.slice(3)}`
      : accessCode;

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | ""
  >("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (accessCode.length !== 6) {
    setMessage("Please enter all 6 digits.");
    setMessageType("error");
    return;
  }

  if (!token) {
    setMessage("Your session has expired. Please log in again.");
    setMessageType("error");
    return;
  }

  try {
    setMessage("");
    setMessageType("");

    const response = await axios.post(
      `${apiBaseUrl}/groups/join`,
      {
        code: accessCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setMessage(
      response.data?.message ||
        "Successfully joined the study group!",
    );
    setMessageType("success");

    setTimeout(() => {
      navigate("/study-groups");
    }, 1000);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;

      if (status === 404) {
        setMessage("Invalid group access code.");
      } else if (status === 409) {
        setMessage(
          "You are already a member of this study group.",
        );
      } else if (status === 401) {
        setMessage(
          "Your session has expired. Please log in again.",
        );
      } else if (Array.isArray(backendMessage)) {
        setMessage(backendMessage.join(", "));
      } else {
        setMessage(
          backendMessage ||
            "Something went wrong. Please try again.",
        );
      }
    } else {
      setMessage("Something went wrong. Please try again.");
    }

    setMessageType("error");
  }
};

  const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  const { token } = useAuthStore();

  return (
    <div className="w-full flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg space-y-6">
        {/* 1. NÚT QUAY LẠI (BACK BUTTON) */}
        <div>
          <button
            type="button"
            onClick={() => navigate("/study-groups")}
            className="
                group
                inline-flex items-center gap-2
                px-3 py-2
                rounded-lg
                text-sky-700
                text-sm
                font-semibold
                transition-all
                duration-200
                hover:bg-sky-50
                hover:text-sky-800
                hover:-translate-x-1
                active:scale-95
            "
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
        </div>

        {/* 2. THẺ FORM THAM GIA NHÓM (JOIN GROUP CARD) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
          {/* Header của Card: Icon + Tiêu đề + Mô tả */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-700">
              {/* Icon người/nhóm học */}
              <svg
                className="w-8 h-8 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Join a Study Group
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Collaborate with fellow learners and accelerate your progress
              together.
            </p>
          </div>

          {/* Form nhập mã truy cập */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="accessCode"
                className="block text-sm font-semibold text-gray-700"
              >
                Group Access Code
              </label>

              {/* Ô nhập mã tương tác */}
              <div className="relative">
                <input
                  id="accessCode"
                  type="text"
                  inputMode="numeric"
                  placeholder="000-000"
                  value={formattedCode}
                  onChange={handleCodeChange}
                  className="w-full py-3.5 px-4 bg-slate-50 border border-slate-300 rounded-xl text-center text-3xl sm:text-4xl font-bold font-mono tracking-[0.2em] text-sky-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Dòng hướng dẫn dưới ô input */}
              <div className="flex items-center gap-1.5 text-xs text-gray-600 pt-1">
                <svg
                  className="w-4 h-4 text-gray-500 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Enter the 6-digit group code provided by the group leader.
                </span>
              </div>
            </div>

            {/* Các nút hành động (Buttons) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/study-groups")}
                className="w-full sm:w-1/2 py-3 px-6 hover:bg-slate-200 text-gray-800 text-sm font-semibold rounded-xl border border-slate-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={accessCode.length !== 6}
                className="w-full sm:w-1/2 py-3 px-6 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Join Group</span>
                <svg
                  className="w-4 h-4 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
          {message && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                messageType === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : messageType === "warning"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                    : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* 3. FOOTER BẢO MẬT (SECURITY FOOTER) */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg
              className="w-3.5 h-3.5 stroke-current text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Secure encrypted invitation system</span>
          </div>
        </div>
      </div>
    </div>
  );
}
