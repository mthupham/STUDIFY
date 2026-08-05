import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeRoleModal from "./Modal/ChangeRoleModal";
import type { RoleType } from "./Modal/ChangeRoleModal";
import BanMemberModal from "./Modal/BanMemberModal";
import RemoveMemberModal from "./Modal/RemoveMemberModal";

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
interface TaskItem {
  title: string;
  description: string;
  dueDate: string;
}

interface Message {
  id: string;
  sender: string;
  senderRole?: string;
  avatar: string;
  time: string;
  text?: string;
  isSelf?: boolean;
  task?: TaskItem;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  level: "FLUENT" | "ADVANCED" | "INTERMEDIATE";
  email: string;
  lessons: number;
  streak: number;
  score: number;
  role: RoleType;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  progress: string;
  statusColor: "emerald" | "sky";
}

// ==========================================
// 2. MEMBER PROFILE DRAWER COMPONENT
// ==========================================
interface MemberProfileDrawerProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const MemberProfileDrawer: React.FC<MemberProfileDrawerProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Advanced Phonetics",
      subtitle: "Due in 2 days",
      completed: false,
    },
    {
      id: 2,
      title: "Business Vocab Quiz",
      subtitle: "Completed",
      completed: true,
    },
  ]);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [showBanMemberModal, setShowBanMemberModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  if (!member) return null;

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
        isOpen
          ? "bg-gray-900/40 backdrop-blur-sm opacity-100 pointer-events-auto"
          : "bg-transparent opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <aside
        className={`
    relative
    w-full
    max-w-md
    h-full
    bg-slate-50
    border-l
    border-slate-300
    shadow-2xl
    flex
    flex-col
    font-['Inter',sans-serif]
    z-10
    transform
    transition-transform
    transition-transform
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ease-out
    ${isOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-300 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-sm font-semibold text-gray-800">
            Member Profile
          </h2>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-slate-100 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
          {/* Section: Avatar & Member Info */}
          <section className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600 mt-0.5">{member.email}</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold shadow-sm">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
              <span>{member.level}</span>
            </div>
          </section>

          {/* Section: Dynamic Stats */}
          <section className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center flex flex-col justify-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                LESSONS
              </span>
              <span className="text-lg font-bold text-sky-700 mt-1">
                {member.lessons}
              </span>
            </div>

            <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center flex flex-col justify-center items-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                STREAK
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-bold text-base mt-1">
                <svg className="w-4 h-4 fill-amber-500" viewBox="0 0 24 24">
                  <path d="M12 23c-4.97 0-9-3.582-9-8 0-3.8 2.5-6.5 5-9 1-1 2-2 2.5-3.5.385 1.5 1.5 3 2.5 4 1.5 1.5 3 2.5 3 5.5 0 1.5-.5 2.5-1 3.5 2-.5 3.5-2 4-3.5.5 1.5.5 3.5 0 5-1 3-4 5.5-7 5.5z" />
                </svg>
                <span>{member.streak}d</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center flex flex-col justify-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                SCORE
              </span>
              <span className="text-lg font-bold text-emerald-700 mt-1">
                {member.score}
              </span>
            </div>
          </section>

          {/* Section: Assigned Tasks */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">
                Assigned Tasks
              </h4>
              <button className="text-xs font-semibold text-sky-700 hover:underline">
                View All
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 bg-white rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    task.completed
                      ? "border-slate-200 opacity-60 bg-slate-50/50"
                      : "border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        task.completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5
                        className={`text-xs font-semibold text-gray-900 ${task.completed ? "line-through text-gray-500" : ""}`}
                      >
                        {task.title}
                      </h5>
                      <span
                        className={`text-[11px] ${task.completed ? "text-emerald-700 font-medium" : "text-gray-500"}`}
                      >
                        {task.subtitle}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {task.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Recent Activity */}
          <section className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Recent Activity
            </h4>
            <div className="relative pl-5 flex flex-col gap-4 border-l-2 border-slate-200 ml-1">
              <div className="relative">
                <span className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-sky-600 rounded-full ring-4 ring-slate-50" />
                <p className="text-xs font-medium text-gray-900">
                  Finished{" "}
                  <span className="text-sky-700 font-semibold">
                    Unit 4: Conversational English
                  </span>
                </p>
                <span className="text-[10px] text-gray-500 font-medium">
                  15 mins ago
                </span>
              </div>
              <div className="relative">
                <span className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-4 ring-slate-50" />
                <p className="text-xs font-medium text-gray-900">
                  Achieved{" "}
                  <span className="text-amber-700 font-semibold">
                    &quot;Early Bird&quot; Badge
                  </span>
                </p>
                <span className="text-[10px] text-gray-500 font-medium">
                  3 hours ago
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}

        <footer className="p-5 bg-slate-100 border-t border-slate-300 flex flex-col gap-2.5 shrink-0">
          <button
            onClick={() => setShowChangeRoleModal(true)}
            className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-gray-800 font-semibold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
          >
            Change Role
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowRemoveModal(true)}
              className="py-2 px-3 bg-white hover:bg-red-50 border border-red-200 text-red-700 font-semibold text-xs rounded-lg transition"
            >
              Remove
            </button>
            <button
              onClick={() => setShowBanMemberModal(true)}
              className="py-2 px-3 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg transition shadow-sm"
            >
              Ban Member
            </button>
          </div>
        </footer>
      </aside>
      <ChangeRoleModal
        isOpen={showChangeRoleModal}
        onClose={() => setShowChangeRoleModal(false)}
        memberName={member.name}
        memberAvatar={member.avatar}
        currentRole={member.role}
        onConfirmRole={(newRole) => {
          console.log("New role:", newRole);

          // TODO: gọi API đổi role

          setShowChangeRoleModal(false);
        }}
      />
      <RemoveMemberModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        memberName={member.name}
        memberAvatar={member.avatar}
        onConfirmRemove={() => {
          console.log("Remove:", member.id);

          // TODO: gọi API remove member

          setShowRemoveModal(false);
        }}
      />
      <BanMemberModal
        isOpen={showBanMemberModal}
        onClose={() => setShowBanMemberModal(false)}
        memberName={member.name}
        memberAvatar={member.avatar}
        onConfirmBan={() => {
          console.log("Ban:", member.id);

          // TODO: API ban member

          setShowBanMemberModal(false);
        }}
      />
    </div>
  );
};

// ==========================================
// 3. MAIN GROUP DASHBOARD COMPONENT
// ==========================================
export const GroupDashboard: React.FC = () => {
  const navigate = useNavigate();

  // --- Sample Members Data ---
  const [members] = useState<Member[]>([
    {
      id: "m1",
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      level: "ADVANCED",
      email: "sarah.chen@university.edu",
      lessons: 42,
      streak: 12,
      score: 850,
      role: "MEMBER",
    },
    {
      id: "m2",
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      level: "FLUENT",
      email: "alex.t@university.edu",
      lessons: 65,
      streak: 24,
      score: 1200,
      role: "MEMBER",
    },
    {
      id: "m3",
      name: "Marco Rossi",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      level: "ADVANCED",
      email: "marco.rossi@university.edu",
      lessons: 28,
      streak: 5,
      score: 620,
      role: "MEMBER",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Alex Thompson",
      senderRole: "ADMIN",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      time: "10:42 AM",
      text: "Hey everyone! I've just uploaded the case study for Thursday's debate. Please review the 'Market Entry' section before our call. Let me know if you have questions!",
    },
    {
      id: "2",
      sender: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      time: "10:45 AM",
      text: "Thanks Alex! I'll take a look during lunch. Should we also focus on the vocabulary list from last week?",
    },
    {
      id: "3",
      sender: "Marco Rossi",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      time: "10:50 AM",
      task: {
        title: "New Task Assigned",
        description: "Review Rhetorical Devices PDF",
        dueDate: "DUE IN 2H",
      },
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const pendingAssignments: Assignment[] = [
    {
      id: "a1",
      title: "Weekly Vocabulary Quiz",
      dueDate: "Oct 25, 4:00 PM",
      progress: "8/12 Done",
      statusColor: "emerald",
    },
    {
      id: "a2",
      title: "Case Study Analysis",
      dueDate: "Oct 28, 9:00 AM",
      progress: "0/12 Done",
      statusColor: "sky",
    },
  ];

  const inviteCode = "LP-B2-99";

  // --- Handlers ---
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: inputMessage,
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Mở Drawer khi bấm chọn thành viên
  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  // Đóng Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedMember(null);
  };

  return (
    <div
      className={`
    relative
    w-full
    max-w-6xl
    h-[850px]
    mx-auto
    bg-white
    rounded-2xl
    shadow-xl
    border
    border-slate-200
    flex
    flex-col
    overflow-hidden
    transition-all
    duration-300
    ${isDrawerOpen ? "scale-[0.985]" : "scale-100"}
  `}
    >
      {/* ---------------- GROUP HEADER ---------------- */}
      <header className="w-full px-8 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex justify-center items-center text-white shadow-md shadow-blue-500/20">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="!text-gray-900 !text-xl !font-semibold !leading-tight">
              Advanced C1 Masterminds
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-mono font-medium rounded">
                #{inviteCode}
              </span>
              <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{members.length} / 10 Members</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate("/study-groups/workspace-leader/edit-group")
            }
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-gray-700 font-medium text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Group Info
          </button>
          <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-slate-100 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* CHAT INTERFACE */}
        <section className="flex-1 flex flex-col bg-white min-w-0">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                TODAY
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3.5 group">
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100 shadow-sm"
                />
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">
                      {msg.sender}
                    </span>
                    {msg.senderRole && (
                      <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded uppercase tracking-wider">
                        {msg.senderRole}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>

                  {msg.text && (
                    <div className="text-gray-800 text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl rounded-tl-none border border-slate-100">
                      {msg.text}
                    </div>
                  )}

                  {msg.task && (
                    <div className="w-80 p-4 bg-white rounded-xl border border-slate-200 flex flex-col gap-3 shadow-sm hover:border-slate-300 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center shrink-0">
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm font-bold">
                            {msg.task.title}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5">
                            {msg.task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                        <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded uppercase tracking-wider">
                          {msg.task.dueDate}
                        </span>
                        <button className="text-sky-700 hover:text-sky-800 text-xs font-bold transition-colors">
                          View Task
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-sky-600 focus-within:ring-1 focus-within:ring-sky-600 transition-all">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.repeat &&
                    !(e.nativeEvent as KeyboardEvent).isComposing
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendMessage();
                  }
                }}
                placeholder="Message the group..."
                rows={2}
                className="w-full bg-transparent p-2 text-gray-800 placeholder-gray-400 text-sm focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center px-2 pt-1">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors">
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
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors">
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all flex items-center gap-2"
                >
                  Send
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- RIGHT SIDEBAR ---------------- */}
        <aside className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto gap-6 p-6">
          {/* Bento Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="cursor-pointer p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col gap-3 text-left group">
              <div className="w-9 h-9 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-xs leading-snug">
                  Schedule & Deadlines
                </p>
                <p className="text-gray-500 text-[11px] mt-0.5">Assign tasks</p>
              </div>
            </button>

            <button 
            onClick={() => navigate("/study-groups/workspace-leader/repository")} 
            className="cursor-pointer p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col gap-3 text-left group">
              <div className="w-9 h-9 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-xs leading-snug">
                  Upload Files
                </p>
                <p className="text-gray-500 text-[11px] mt-0.5">File manager</p>
              </div>
            </button>
          </div>

          {/* Member Management Section */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sky-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <h3 className="text-gray-900 font-bold text-xs uppercase tracking-wider">
                  MANAGE MEMBERS
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-mono font-semibold rounded-full">
                12/15 Seats
              </span>
            </div>

            {/* Render List Members */}
            <div className="flex flex-col gap-1.5">
              {members.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleSelectMember(member)}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 transition text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-xs font-semibold group-hover:text-sky-700 transition-colors">
                        {member.name}
                      </span>
                      <span className="text-sky-700 text-[10px] font-bold tracking-wider">
                        {member.level}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-sky-700 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="w-full py-2 border border-sky-700/20 text-sky-700 hover:bg-sky-50 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 mt-1"
            >
              {copiedCode ? (
                <span className="text-emerald-600 font-medium">
                  Copied Code!
                </span>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Invite New Members</span>
                </>
              )}
            </button>
          </div>

          {/* Pending Assignments Section */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-gray-900 font-bold text-xs uppercase tracking-wider">
                PENDING ASSIGNMENTS
              </h3>
              <button className="text-sky-700 hover:text-sky-800 text-[11px] font-bold transition-colors">
                View All
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {pendingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-3 bg-slate-50 rounded-lg border-l-4 ${
                    assignment.statusColor === "emerald"
                      ? "border-l-emerald-600"
                      : "border-l-sky-700"
                  } flex flex-col gap-1`}
                >
                  <p className="text-gray-900 text-xs font-bold">
                    {assignment.title}
                  </p>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 mt-0.5">
                    <span>{assignment.dueDate}</span>
                    <span className="font-semibold text-gray-700">
                      {assignment.progress}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm mt-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Assignment
            </button>
          </div>
        </aside>
      </div>

      {/* ---------------- MEMBER PROFILE DRAWER (POPUP) ---------------- */}
      <MemberProfileDrawer
        member={selectedMember}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default GroupDashboard;
