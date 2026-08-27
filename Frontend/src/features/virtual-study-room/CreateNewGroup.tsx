import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createGroup } from "./services/groupService";
import { useAuthStore } from "../auth/store/useAuthStore";
import { ALL_ICONS } from "./components/groupIcons"; // <--- Import icons đã được tách

// ==========================================
// 1. POP-UP MODAL CHỌN ICON
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
// 2. COMPONENT CHÍNH: CREATE STUDY GROUP PAGE
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

      const createdGroup = response.data.group;
      const codeFromBackend = createdGroup.code;

      if (codeFromBackend) {
        setGroupCode(codeFromBackend);
      }

      setMessage(
        response.message ||
          `Group "${createdGroup.name}" created successfully!`,
      );
      setMessageType("success");

      setTimeout(() => {
        navigate(
          createdGroup?.id
            ? `/study-groups/${createdGroup.id}/workspace-leader`
            : "/study-groups",
        );
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
                    This unique code will be automatically generated by the system when you create the group.
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