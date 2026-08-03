import React from "react";
import { useNavigate } from "react-router-dom";

// ==========================================
// DỮ LIỆU MẪU (MOCK DATA)
// ==========================================

const GROUPS_DATA = [
  {
    id: "1",
    title: "Parisian Nomads",
    level: "B1 Level",
    levelColor: "bg-emerald-100 text-emerald-700",
    description:
      "Mastering everyday French conversations through immersive weekly chats.",
    iconBg: "bg-blue-100 text-sky-700",
    status: "Starts in 2h",
    statusType: "time",
    membersCount: 14, // 2 hiển thị + 12
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "2",
    title: "Nihongo Readers",
    level: "Literature",
    levelColor: "bg-slate-200 text-gray-700",
    description:
      "Deep diving into contemporary Japanese novels and kanji nuance.",
    iconBg: "bg-orange-100 text-amber-800",
    status: "Private",
    statusType: "lock",
    membersCount: 46, // 1 hiển thị + 45
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "3",
    title: "Business English Pro",
    level: "C1 Level",
    levelColor: "bg-blue-100 text-sky-700",
    description:
      "Corporate communication, negotiation, and high-level presentations.",
    iconBg: "bg-emerald-100 text-emerald-800",
    status: "Active Now",
    statusType: "active",
    membersCount: 10, // 2 hiển thị + 8
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    ],
  },
];

const UPCOMING_MEETUPS = [
  {
    id: "1",
    date: "14",
    month: "OCT",
    title: "Parisian Nomads",
    subtitle: "Live Audio Chat • 18:00",
    color: "sky",
  },
  {
    id: "2",
    date: "16",
    month: "OCT",
    title: "Nihongo Readers",
    subtitle: "Kanji Workshop • 20:30",
    color: "amber",
  },
];

// ==========================================
// COMPONENT CHÍNH
// ==========================================

export default function StudyGroupHub() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 font-['Inter'] text-gray-900">
      {/* 1. HEADER SECTION */}
      <HeaderSection />

      {/* 2. MAIN BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Danh sách nhóm học */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GROUPS_DATA.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}

          {/* Card phôi (Placeholder) tạo nhóm mới */}
          <CreateGroupCard />
        </div>

        {/* Cột phải: Sidebar Thống kê & Sự kiện */}
        <div className="space-y-6">
          <EngagementCard />
          <UpcomingEventsCard />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

/**
 * Header chứa tiêu đề trang và các nút hành động chính
 */
function HeaderSection() {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
      <div>
        <h1 className="!text-3xl !font-bold !text-gray-900 !tracking-tight">
          Study Group Hub
        </h1>
        <p className="text-gray-600 mt-1">
          Connect with fellow learners to accelerate your progress.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/study-groups/join-group")}
          className="px-5 py-2.5 rounded-xl border border-sky-700 text-sky-700 font-medium hover:bg-sky-50 transition flex items-center gap-2"
        >
          {/* User Plus Icon */}
          <svg
            className="w-5 h-5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Join Group
        </button>
        <button
          onClick={() => navigate("/study-groups/new-group")}
          className="px-5 py-2.5 rounded-xl bg-sky-700 text-white font-medium shadow-md hover:bg-sky-800 transition flex items-center gap-2"
        >
          {/* Plus Icon */}
          <svg
            className="w-5 h-5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Group
        </button>
      </div>
    </header>
  );
}

/**
 * Card hiển thị thông tin chi tiết từng nhóm học
 */
function GroupCard({ group }: { group: (typeof GROUPS_DATA)[0] }) {
    const navigate = useNavigate();
  const extraMembers = group.membersCount - group.avatars.length;

  return (
    <button
  type="button"
  onClick={() => navigate(`/study-groups/workspace-member`)}
  className="
    w-full
    text-left
    p-6
    bg-slate-50
    border
    border-slate-200/80
    rounded-2xl
    shadow-sm
    hover:shadow-md
    hover:border-sky-300
    hover:-translate-y-1
    transition-all
    flex
    flex-col
    justify-between
    gap-4
    cursor-pointer
  "
>
      <div>
        {/* Header card: Icon + Badge cấp độ */}
        <div className="flex justify-between items-start">
          <div
            className={`w-14 h-14 ${group.iconBg} rounded-2xl flex items-center justify-center`}
          >
            {/* Book/Group Icon Placeholder */}
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${group.levelColor}`}
          >
            {group.level}
          </span>
        </div>

        {/* Tiêu đề & Mô tả */}
        <h3 className="text-lg font-bold text-gray-900 mt-4">{group.title}</h3>
        <p className="text-sm font-normal text-gray-600 mt-1 line-clamp-2 leading-relaxed">
          {group.description}
        </p>
      </div>

      {/* Footer card: Danh sách thành viên + Trạng thái */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/40">
        {/* Thành viên (Avatar Stack) */}
        <div className="flex items-center -space-x-2">
          {group.avatars.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt="Member Avatar"
              className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover"
            />
          ))}
          {extraMembers > 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-gray-800">
              +{extraMembers}
            </div>
          )}
        </div>

        {/* Trạng thái nhóm */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
          <StatusIcon type={group.statusType} />
          <span>{group.status}</span>
        </div>
      </div>
    </button>
  );
}

/**
 * Card dạng viền đứt nét để tạo nhóm mới
 */
function CreateGroupCard() {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/study-groups/new-group")}
    className="p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-sky-600 hover:bg-sky-50/50 transition flex flex-col items-center justify-center gap-3 text-gray-600 hover:text-sky-700 min-h-[220px]">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
        <svg
          className="w-6 h-6 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <span className="text-base font-medium">Launch a new study circle</span>
    </button>
  );
}

/**
 * Sidebar Card: Thống kê chỉ số tương tác
 */
function EngagementCard() {
  return (
    <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm space-y-6">
      <h4 className="text-sm font-semibold text-gray-900">Your Engagement</h4>

      {/* Biểu đồ tròn tiến độ + Nhãn */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* SVG Progress Circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-sky-700"
              strokeDasharray="70, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-xl font-bold text-gray-900">70%</span>
        </div>

        <div>
          <span className="text-2xl font-bold text-sky-700 block">High</span>
          <span className="text-xs text-gray-600 font-medium">
            Participating in 3 groups
          </span>
        </div>
      </div>

      {/* Thanh Tiến độ Tăng trưởng từ vựng */}
      <div className="space-y-2 pt-2 border-t border-slate-200/50">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-600">Vocabulary Retention</span>
          <span className="text-gray-900 font-bold">+12%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-700 rounded-full w-[75%]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Sidebar Card: Danh sách lịch hẹn sắp tới
 */
function UpcomingEventsCard() {
  return (
    <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-gray-900">
          Upcoming Meetups
        </h4>
        <button className="text-xs font-bold text-sky-700 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {UPCOMING_MEETUPS.map((event) => (
          <div
            key={event.id}
            className="p-3 bg-white/60 border border-slate-100 rounded-xl flex items-center gap-3"
          >
            {/* Lịch / Ngày tháng */}
            <div
              className={`min-w-[44px] p-2 rounded-lg text-center ${
                event.color === "sky"
                  ? "bg-sky-100 text-sky-700"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              <div className="text-[10px] font-bold uppercase leading-none">
                {event.month}
              </div>
              <div className="text-lg font-bold leading-tight mt-0.5">
                {event.date}
              </div>
            </div>

            {/* Chi tiết sự kiện */}
            <div>
              <h5 className="text-sm font-medium text-gray-900">
                {event.title}
              </h5>
              <p className="text-xs text-gray-500 font-medium">
                {event.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Helper Component: Icon hiển thị trạng thái
 */
function StatusIcon({ type }: { type: string }) {
  if (type === "lock") {
    return (
      <svg
        className="w-3.5 h-3.5 stroke-current"
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
    );
  }
  if (type === "active") {
    return (
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    );
  }
  // Mặc định icon đồng hồ cho thời gian
  return (
    <svg
      className="w-3.5 h-3.5 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
