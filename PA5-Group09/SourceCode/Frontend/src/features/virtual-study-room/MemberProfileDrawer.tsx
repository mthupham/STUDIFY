import React, { useState } from "react";

// ==========================================
// 1. SVG ICON COMPONENTS
// ==========================================

const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BadgeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const FlameIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 23c-4.97 0-9-3.582-9-8 0-3.8 2.5-6.5 5-9 1-1 2-2 2.5-3.5.385 1.5 1.5 3 2.5 4 1.5 1.5 3 2.5 3 5.5 0 1.5-.5 2.5-1 3.5 2-.5 3.5-2 4-3.5.5 1.5.5 3.5 0 5-1 3-4 5.5-7 5.5z" />
  </svg>
);

const TaskIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ActivityIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserRoleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const RemoveUserIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0zM2.25 19.5a7.5 7.5 0 0113.5-3" />
  </svg>
);

const BanIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

// ==========================================
// 2. MAIN DRAWER COMPONENT
// ==========================================

export const MemberProfileDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // State bài tập (Task)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Advanced Phonetics", subtitle: "Due in 2 days", completed: false, isViolet: true },
    { id: 2, title: "Business Vocab Quiz", subtitle: "Completed", completed: true, isViolet: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  if (!isOpen) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen bg-slate-100">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 !bg-sky-700 !text-white font-semibold rounded-xl shadow-md hover:bg-sky-800 transition"
        >
          Open Member Profile
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-sm transition-opacity">
      {/* Container Drawer */}
      <aside className="w-full max-w-md h-full bg-slate-50 border-l border-slate-300 shadow-2xl flex flex-col font-['Inter',sans-serif]">
        
        {/* Drawer Header */}
        <header className="px-6 py-4 border-b border-slate-300 flex items-center justify-between bg-white shrink-0">
          <h2 className="!text-sm !font-semibold !text-gray-800">Member Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close profile drawer"
            className="p-2 rounded-full !text-gray-500 hover:text-gray-900 hover:bg-slate-100 transition"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>

        {/* Drawer Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
          
          {/* Section: Avatar & Basic Info */}
          <section className="flex flex-col items-center text-center">
            {/* Avatar Wrapper */}
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full ring-4 ring-blue-100 overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online Indicator Badge */}
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-600 rounded-full border-2 border-slate-50 flex items-center justify-center shadow-sm">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
            </div>

            {/* User Info */}
            <h3 className="text-2xl font-bold text-gray-900">Sarah Chen</h3>
            <p className="text-sm text-gray-600 mt-1">sarah.chen@university.edu</p>

            {/* Proficiency Badge */}
            <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 text-white rounded-full text-xs font-semibold shadow-sm">
              <BadgeIcon className="w-4 h-4" />
              <span>Intermediate B1</span>
            </div>
          </section>

          {/* Section: Stats Grid */}
          <section className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center flex flex-col items-center justify-center gap-1">
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">LESSONS</span>
              <span className="text-lg font-bold text-sky-700">42</span>
            </div>

            <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center flex flex-col items-center justify-center gap-1">
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">STREAK</span>
              <div className="flex items-center gap-1 text-amber-600 font-bold text-base">
                <FlameIcon className="w-4 h-4 fill-amber-500" />
                <span>12d</span>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center flex flex-col items-center justify-center gap-1">
              <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">SCORE</span>
              <span className="text-lg font-bold text-emerald-700">850</span>
            </div>
          </section>

          {/* Section: Assigned Tasks */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TaskIcon className="w-5 h-5 text-sky-700" />
                <h4 className="text-sm font-semibold text-gray-900">Assigned Tasks</h4>
              </div>
              <button className="text-xs font-medium text-sky-700 hover:underline">View All</button>
            </div>

            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    task.completed
                      ? "border-slate-200 opacity-60 bg-slate-50/50"
                      : "border-slate-300 hover:border-slate-400 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        task.completed ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-sky-700"
                      }`}
                    >
                      <TaskIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5
                        className={`text-sm font-medium text-gray-900 ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </h5>
                      <span
                        className={`text-xs ${
                          task.completed ? "text-emerald-700 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {task.completed ? "Completed" : task.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Custom Checkbox */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {task.completed && <CheckIcon className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Recent Activity */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ActivityIcon className="w-5 h-5 text-sky-700" />
              <h4 className="text-sm font-semibold text-gray-900">Recent Activity</h4>
            </div>

            {/* Timeline List */}
            <div className="relative pl-6 flex flex-col gap-6 ml-2 border-l-2 border-slate-200">
              {/* Item 1 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 bg-sky-600 rounded-full ring-4 ring-slate-50" />
                <p className="text-sm font-medium text-gray-900">
                  Finished <span className="text-sky-700 font-semibold">Unit 4: Conversational English</span>
                </p>
                <span className="text-xs text-gray-500 font-medium">15 mins ago</span>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 bg-amber-500 rounded-full ring-4 ring-slate-50" />
                <p className="text-sm font-medium text-gray-900">
                  Achieved <span className="text-amber-700 font-semibold">&quot;Early Bird&quot; Badge</span>
                </p>
                <span className="text-xs text-gray-500 font-medium">3 hours ago</span>
              </div>

              {/* Item 3 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 bg-slate-300 rounded-full ring-4 ring-slate-50" />
                <p className="text-sm font-medium text-gray-900">Joined IELTS Study Group</p>
                <span className="text-xs text-gray-500 font-medium">Yesterday</span>
              </div>
            </div>
          </section>
        </div>

        {/* Drawer Footer Actions */}
        <footer className="p-6 bg-slate-100 border-t border-slate-300 flex flex-col gap-3 shrink-0">
          <button
            onClick={() => alert("Role settings opened")}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-gray-800 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            <UserRoleIcon className="w-4 h-4 text-gray-600" />
            Change Role
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => alert("Member removed")}
              className="py-2.5 px-3 bg-white hover:bg-red-50 border border-red-200 text-red-700 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <RemoveUserIcon className="w-4 h-4" />
              Remove
            </button>
            <button
              onClick={() => alert("Member banned")}
              className="py-2.5 px-3 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <BanIcon className="w-4 h-4" />
              Ban Member
            </button>
          </div>
        </footer>

      </aside>
    </div>
  );
};

export default MemberProfileDrawer;