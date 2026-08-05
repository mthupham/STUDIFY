import React from 'react';

// ==========================================
// 1. TYPES & INTERFACES (Khai báo kiểu dữ liệu)
// ==========================================

type TaskStatus = 'In Progress' | 'Not Started' | 'Completed';
type CategoryType = 'essay' | 'phonetics' | 'vocabulary' | 'grammar';

interface Member {
  name: string;
  avatarUrl?: string;
  initials?: string;
  isCurrentUser?: boolean;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  member: Member;
  dueDate: string;
  dueStatusText: string;
  dueStatusColorClass: string;
  status: TaskStatus;
  isHighlighted?: boolean;
}

// ==========================================
// 2. MOCK DATA (Dữ liệu mẫu chuẩn hóa)
// ==========================================

const ASSIGNMENTS_DATA: Assignment[] = [
  {
    id: '1',
    title: 'Essay: Global Economic Trends',
    description: 'Analyze 3 key lexical chains',
    category: 'essay',
    member: {
      name: 'David Chen',
      avatarUrl: 'https://placehold.co/32x32',
    },
    dueDate: 'Oct 24, 2023',
    dueStatusText: 'Tomorrow',
    dueStatusColorClass: 'text-red-700 font-medium',
    status: 'In Progress',
  },
  {
    id: '2',
    title: 'Phonetics Drill: Nuance & Tone',
    description: 'Focus on rising intonation in questions',
    category: 'phonetics',
    member: {
      name: 'Sarah Jenkins',
      avatarUrl: 'https://placehold.co/32x32',
    },
    dueDate: 'Oct 26, 2023',
    dueStatusText: 'In 3 days',
    dueStatusColorClass: 'text-gray-700',
    status: 'Not Started',
  },
  {
    id: '3',
    title: 'Vocabulary: Advanced Synonyms',
    description: 'Mastering 50 Academic Word List items',
    category: 'vocabulary',
    member: {
      name: 'Alex Morgan (You)',
      initials: 'AM',
      isCurrentUser: true,
    },
    dueDate: 'Oct 22, 2023',
    dueStatusText: 'Completed',
    dueStatusColorClass: 'text-emerald-800 font-bold',
    status: 'Completed',
    isHighlighted: true,
  },
  {
    id: '4',
    title: 'Grammar: Inversion Structures',
    description: 'Advanced sentence transformation',
    category: 'grammar',
    member: {
      name: 'Marcus Thorne',
      avatarUrl: 'https://placehold.co/32x32',
    },
    dueDate: 'Oct 28, 2023',
    dueStatusText: 'Next Week',
    dueStatusColorClass: 'text-gray-700',
    status: 'In Progress',
  },
];

// ==========================================
// 3. SVG ICONS COMPONENTS (Tập hợp Icon SVG chuẩn)
// ==========================================

/** Icon Dấu Cộng (+) */
const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

/** Icon Mũi Tên Tăng Trưởng */
const TrendingUpIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0l7.734-7.734m0 0l-5.625 0m5.625 0v5.625" />
  </svg>
);

/** Icon Bọc Lọc / Tùy chỉnh (Adjustments/Filter) */
const FilterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5m6-6h6m-6 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H10.5" />
  </svg>
);

/** Icon Menu 3 Dấu Chấm Ngang */
const MoreHorizontalIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

/** Icon Menu 3 Dấu Chấm Dọc */
const MoreVerticalIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);

/** Component hiển thị Icon cho loại Bài Tập */
const CategoryIcon: React.FC<{ category: CategoryType; isHighlighted?: boolean }> = ({ category, isHighlighted }) => {
  const iconClass = isHighlighted ? "w-5 h-5 text-white" : "w-5 h-5";

  switch (category) {
    case 'essay':
      return (
        <svg className={`${iconClass} ${!isHighlighted ? "text-sky-700" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case 'phonetics':
      return (
        <svg className={`${iconClass} ${!isHighlighted ? "text-amber-700" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 003-3V4.5a3 3 0 00-6 0v8.25a3 3 0 003 3z" />
        </svg>
      );
    case 'vocabulary':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
        </svg>
      );
    case 'grammar':
      return (
        <svg className={`${iconClass} ${!isHighlighted ? "text-emerald-800" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      );
    default:
      return null;
  }
};

/** Component hiển thị Huy hiệu Trạng thái (Status Badge) */
const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  switch (status) {
    case 'In Progress':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
          <svg className="w-3.5 h-3.5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          In Progress
        </span>
      );
    case 'Not Started':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200/70 text-gray-700 text-xs font-bold rounded-full">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Not Started
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/10 border border-emerald-800/20 text-emerald-800 text-xs font-bold rounded-full">
          <svg className="w-3.5 h-3.5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Completed
        </span>
      );
    default:
      return null;
  }
};

// ==========================================
// 4. MAIN DASHBOARD COMPONENT
// ==========================================

export const TaskAssignmentDashboard: React.FC = () => {
  return (
    <main className="w-full  mx-auto flex flex-col gap-8 font-['Inter'] text-gray-900 p-4">
      
      {/* ---------------- SECTION 1: HEADER ---------------- */}
      <header className="flex justify-between items-end gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold leading-10 text-gray-900">
            Task Assignment
          </h1>
          <p className="text-lg font-normal leading-7 text-gray-700">
            Manage weekly deliverables for the{' '}
            <span className="text-sky-700 font-medium">C1 Oxford Proficiency</span> group.
          </p>
        </div>

        {/* Nút Tạo Nhiệm Vụ Mới */}
        <button 
          type="button"
          className="px-5 py-3 bg-sky-700 hover:bg-sky-800 text-white text-base font-medium rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <PlusIcon className="w-5 h-5 text-white" />
          <span>Assign New Task</span>
        </button>
      </header>

      {/* ---------------- SECTION 2: BENTO STATS GRID ---------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Active Tasks */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-300/30 flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Active Tasks
          </span>
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-sky-700 leading-tight">12</span>
            <div className="flex items-center gap-1 text-emerald-800 text-sm font-bold">
              <TrendingUpIcon />
              <span>3</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pending Peer Reviews */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-300/30 flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Pending Peer Reviews
          </span>
          <div className="pt-2">
            <span className="text-5xl font-bold text-amber-800 leading-tight">05</span>
          </div>
        </div>

        {/* Card 3: Group Completion */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-300/30 flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Group Completion
          </span>
          <div className="pt-2 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-900">Progress</span>
              <span className="font-bold text-gray-900">78%</span>
            </div>
            {/* Thanh Progress bar */}
            <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div className="w-[78%] h-full bg-sky-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 4: Upcoming Deadline */}
        <div className="p-6 bg-blue-600 rounded-xl shadow-sm text-white flex flex-col justify-between">
          <span className="text-xs font-medium text-white/80 uppercase tracking-wide">
            Upcoming Deadline
          </span>
          <div className="pt-2 flex flex-col gap-1">
            <p className="text-base font-normal leading-6">
              Idiomatic Expressions<br />Quiz
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl font-bold leading-none">02</span>
              <span className="text-2xl font-semibold opacity-80">days</span>
            </div>
          </div>
        </div>

      </section>

      {/* ---------------- SECTION 3: DASHBOARD TABLE ---------------- */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden flex flex-col">
        
        {/* Header của Bảng */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-300 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Current Assignments</h2>
          <div className="flex gap-1">
            <button 
              type="button" 
              aria-label="Filter assignments" 
              className="p-2 rounded-lg hover:bg-slate-200/60 text-gray-700 transition-colors"
            >
              <FilterIcon />
            </button>
            <button 
              type="button" 
              aria-label="More options" 
              className="p-2 rounded-lg hover:bg-slate-200/60 text-gray-700 transition-colors"
            >
              <MoreHorizontalIcon />
            </button>
          </div>
        </div>

        {/* Bảng dữ liệu chuẩn HTML */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/60 border-b border-slate-200 text-xs font-bold text-gray-700 uppercase tracking-wide">
                <th scope="col" className="px-6 py-4">Task Title</th>
                <th scope="col" className="px-6 py-4">Assigned Member</th>
                <th scope="col" className="px-6 py-4">Due Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {ASSIGNMENTS_DATA.map((item) => (
                <tr 
                  key={item.id}
                  className={`transition-colors ${
                    item.isHighlighted ? 'bg-sky-700/5 hover:bg-sky-700/10' : 'hover:bg-slate-50/60'
                  }`}
                >
                  {/* Tiêu đề & Nội dung bài tập */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        item.isHighlighted ? 'bg-sky-700' : item.category === 'phonetics' ? 'bg-amber-700/10' : item.category === 'grammar' ? 'bg-emerald-300/20' : 'bg-blue-600/10'
                      }`}>
                        <CategoryIcon category={item.category} isHighlighted={item.isHighlighted} />
                      </div>
                      <div>
                        <p className="text-base font-normal text-gray-900 leading-snug">
                          {item.title}
                        </p>
                        <p className="text-xs font-normal text-gray-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Thành viên thực hiện */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.member.avatarUrl ? (
                        <img 
                          src={item.member.avatarUrl} 
                          alt={item.member.name}
                          className="w-8 h-8 rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 text-sky-950 font-bold text-xs rounded-full flex items-center justify-center shrink-0">
                          {item.member.initials}
                        </div>
                      )}
                      <span className={`text-base text-gray-900 ${item.member.isCurrentUser ? 'font-semibold' : 'font-normal'}`}>
                        {item.member.name}
                      </span>
                    </div>
                  </td>

                  {/* Ngày hết hạn */}
                  <td className="px-6 py-4">
                    <p className="text-base font-normal text-gray-900">{item.dueDate}</p>
                    <p className={`text-xs ${item.dueStatusColorClass}`}>{item.dueStatusText}</p>
                  </td>

                  {/* Trạng thái công việc */}
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Thao tác (Actions) */}
                  <td className="px-6 py-4 text-right">
                    <button 
                      type="button" 
                      aria-label="Task options"
                      className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-slate-200/50"
                    >
                      <MoreVerticalIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang (Pagination) */}
        <footer className="p-6 bg-slate-50 border-t border-slate-300 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-700">
            Showing 1-4 of 12 assignments
          </span>
          <div className="flex gap-2">
            <button 
              type="button" 
              disabled
              className="px-4 py-2 opacity-50 rounded-lg border border-slate-300 text-sm font-semibold text-gray-900 cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              type="button" 
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-gray-900 hover:bg-slate-100 transition-colors"
            >
              Next
            </button>
          </div>
        </footer>

      </section>

    </main>
  );
};

export default TaskAssignmentDashboard;