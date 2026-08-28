import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupDetails, updateGroup } from "./services/groupService";
import { useAuthStore } from "../auth/store/useAuthStore";
import { ALL_ICONS } from "./components/groupIcons";

interface DisplayMember {
  id: string | number;
  name: string;
  avatar?: string;
  role?: string;
}

// Kiểu dữ liệu mở rộng để đảm bảo không bị lỗi TypeScript với các trường tùy chọn từ API
interface ExtendedGroup {
  id: number;
  name: string;
  description?: string | null;
  icon?: string | null;
  membersCount?: number;
  level?: string;
  category?: string;
  members?: Array<{
    userId: number;
    role?: string;
    user?: {
      name?: string;
      avatar?: string;
    };
  }>;
}

interface ExtendedGroupDetail {
  group: ExtendedGroup;
  members?: DisplayMember[];
}

// ==========================================
// 1. SVG ICON COMPONENTS
// ==========================================

const ArrowLeftIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const MessageSquareIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

const BookOpenIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const GlobeIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-15.432-4.5A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253"
    />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

// Danh sách icon mặc định
const ICON_OPTIONS = [
  { id: "chat", Component: MessageSquareIcon },
  { id: "book", Component: BookOpenIcon },
  { id: "globe", Component: GlobeIcon },
  { id: "users", Component: UsersIcon },
  { id: "sparkles", Component: SparklesIcon },
  { id: "custom", Component: PlusIcon },
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export const EditGroupSettings: React.FC = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const { token } = useAuthStore();
  const numericGroupId = Number(groupId);

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [selectedCustomIcon, setSelectedCustomIcon] = useState<string | null>(
    null,
  );
  const [showIconModal, setShowIconModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States cho dữ liệu động thực tế
  const [membersCount, setMembersCount] = useState(0);
  const [members, setMembers] = useState<DisplayMember[]>([]);
  const [level, setLevel] = useState("General");

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const MAX_CHARS = 500;

  // Lấy Icon key hiện tại đang chọn để lưu backend
  const activeIconId =
    selectedCustomIcon || ICON_OPTIONS[selectedIconIndex]?.id || "chat";

  // Pre-fill form với dữ liệu thực từ API
  useEffect(() => {
    let isMounted = true;
    if (!token || isNaN(numericGroupId) || numericGroupId <= 0) return;

    getGroupDetails(token, numericGroupId)
      .then((detailData) => {
        if (!isMounted) return;

        const detail = detailData as unknown as ExtendedGroupDetail;
        const group = detail.group;
        if (!group) return;

        setGroupName(group.name || "");
        setDescription(group.description ?? "");

        setMembersCount(
          group.membersCount ||
            group.members?.length ||
            detail.members?.length ||
            0,
        );

        if (group.members) {
          setMembers(
            group.members.map((member) => ({
              id: member.userId,
              name: member.user?.name ?? `User #${member.userId}`,
              avatar: member.user?.avatar ?? undefined,
              role: member.role,
            })),
          );
        } else if (detail.members) {
          setMembers(detail.members);
        }

        setLevel(group.level || group.category || "Study Group");

        // Đồng bộ icon từ backend
        if (group.icon) {
          const standardIndex = ICON_OPTIONS.findIndex(
            (item) => item.id === group.icon,
          );

          if (standardIndex !== -1) {
            setSelectedIconIndex(standardIndex);
            setSelectedCustomIcon(null);
          } else {
            setSelectedCustomIcon(group.icon);
          }
        }
      })
      .catch((err) => {
        if (isMounted) console.error(err);
      });

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [token, numericGroupId]);

  // Lấy Icon Component đang chọn để hiển thị Live Preview
  const renderSelectedIcon = () => {
    if (selectedCustomIcon) {
      const iconObj = ALL_ICONS.find((item) => item.id === selectedCustomIcon);
      if (iconObj) return iconObj.icon("w-9 h-9");
    }

    const IconComp =
      ICON_OPTIONS[selectedIconIndex]?.Component || MessageSquareIcon;
    return <IconComp className="w-9 h-9" />;
  };

  // Xử lý Submit cập nhật tên, mô tả và ICON
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || isNaN(numericGroupId) || isSubmitting) return;

    // Validate tên nhóm rỗng
    if (!groupName.trim()) {
      setNotification({
        type: "error",
        message: "Group name cannot be empty.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await updateGroup(token, numericGroupId, {
        name: groupName.trim(),
        description: description.trim() || null,
        icon: activeIconId,
      });

      setNotification({
        type: "success",
        message: "Saved group settings successfully!",
      });

      // Notify other parts of the app that this group was updated
      try {
        window.dispatchEvent(
          new CustomEvent("study-group-updated", {
            detail: {
              groupId: numericGroupId,
              icon: activeIconId,
              name: groupName.trim(),
            },
          }),
        );
      } catch (e) {
        console.warn("Could not dispatch study-group-updated event", e);
      }

      timerRef.current = setTimeout(() => {
        setNotification(null);
        navigate(`/study-groups/${numericGroupId}/workspace-leader`);
      }, 1500);
    } catch {
      setNotification({
        type: "error",
        message: "Failed to save group settings. Please try again.",
      });

      timerRef.current = setTimeout(() => {
        setNotification(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-['Inter',sans-serif]">
      {/* Modal chọn Icon Custom */}
      {showIconModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={() => setShowIconModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[420px] shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-900">
                Choose Group Icon
              </h3>
              <button
                type="button"
                onClick={() => setShowIconModal(false)}
                className="text-gray-500 hover:text-gray-900 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 max-h-[320px] overflow-y-auto p-1">
              {ALL_ICONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCustomIcon(item.id);
                    setShowIconModal(false);
                  }}
                  className={`h-14 w-14 rounded-xl flex items-center justify-center border transition ${
                    selectedCustomIcon === item.id
                      ? "bg-sky-100 border-sky-700 text-sky-700"
                      : "bg-white border-slate-300 text-gray-700 hover:bg-slate-100"
                  }`}
                >
                  {item.icon("w-7 h-7")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Thông báo Notification Toast */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl shadow-lg border flex items-center gap-3 transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {notification.type === "success" ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M10.29 3.86l-7.82 14a2 2 0 001.71 3h15.64a2 2 0 001.71-3l-7.82-14a2 2 0 00-3.42 0z"
              />
            </svg>
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Top Header / App Bar */}
      <header className="sticky top-0 z-10 px-4 py-5 sm:px-8 flex items-center gap-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <button
          type="button"
          onClick={() =>
            navigate(`/study-groups/${numericGroupId}/workspace-leader`)
          }
          className="text-gray-700 hover:text-sky-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <h1 className="!text-sky-700 !text-2xl !font-bold !leading-8 !font-['Inter']">
          Edit Group Info
        </h1>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* ================= LEFT COLUMN: FORM EDIT ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-sm flex flex-col gap-6">
              <h2 className="!text-2xl !font-semibold !text-gray-900">
                General Information
              </h2>

              <div className="flex flex-col gap-6">
                {/* Field: Group Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="groupName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Group Name
                  </label>
                  <input
                    id="groupName"
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-slate-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition"
                    placeholder="Enter group name"
                  />
                </div>

                {/* Field: Description */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-slate-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition resize-none"
                    placeholder="Describe your group..."
                  />
                  <div className="text-right text-xs font-medium text-gray-500">
                    {description.length} / {MAX_CHARS} characters
                  </div>
                </div>

                {/* Field: Group Icon Picker */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Group Icon
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ICON_OPTIONS.map((item, index) => {
                      const IconComp = item.Component;
                      const isSelected =
                        selectedCustomIcon !== null
                          ? item.id === "custom"
                          : selectedIconIndex === index;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (item.id === "custom") {
                              setShowIconModal(true);
                            } else {
                              setSelectedIconIndex(index);
                              setSelectedCustomIcon(null);
                            }
                          }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-blue-100 border-2 border-sky-700 text-sky-700 shadow-sm"
                              : "bg-white border border-slate-300 text-gray-700 hover:bg-slate-100"
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PREVIEW CARD & ACTIONS ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Preview Card */}
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
              {/* Card Banner */}
              <div className="h-32 bg-blue-600 relative">
                {/* Group Avatar Overlay */}
                <div className="absolute left-8 -bottom-10 p-1 bg-slate-50 rounded-2xl shadow-sm">
                  <div className="w-20 h-20 bg-sky-700 rounded-xl flex items-center justify-center text-white">
                    {renderSelectedIcon()}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-8 pt-14 pb-8 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                      {groupName || "Group Name"}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-800/10 text-emerald-800 text-xs font-bold rounded">
                        {level}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        • {membersCount}{" "}
                        {membersCount === 1 ? "Member" : "Members"}
                      </span>
                    </div>
                  </div>
                  <StarIcon className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                <p className="text-base text-gray-700 leading-relaxed break-words">
                  {description || "No description provided."}
                </p>

                {/* Member Avatars (Thực tế từ API) */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2 overflow-hidden">
                    {members.slice(0, 3).map((m, idx) => (
                      <img
                        key={m.id || idx}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-50 object-cover"
                        src={
                          m.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            m.name || "Member",
                          )}&background=random`
                        }
                        alt={m.name || "Member avatar"}
                      />
                    ))}
                    {membersCount > 3 && (
                      <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-slate-50 flex items-center justify-center text-[10px] font-bold text-gray-700">
                        +{membersCount - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Active members
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <CheckIcon className="w-5 h-5" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() =>
                  navigate(`/study-groups/${numericGroupId}/workspace-leader`)
                }
                type="button"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 border border-slate-300 text-gray-700 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditGroupSettings;
