import React, { useState, useEffect } from 'react';

// ==========================================
// TYPES & CONSTANTS
// ==========================================

export type TaskStatus = 'In Progress' | 'Not Started' | 'Completed';
export type CategoryType = 'essay' | 'phonetics' | 'vocabulary' | 'grammar';

export interface Member {
  userId: number;
  name: string;
  avatarUrl?: string;
  initials?: string;
  isCurrentUser?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  category: CategoryType;
  member: Member;
  startDate?: string;
  dueDate: string;
  dueStatusText: string;
  dueStatusColorClass: string;
  status: TaskStatus;
  isHighlighted?: boolean;
  isDisabled?: boolean;
}

/** Danh sách Thành viên cố định dùng cho Dropdown */
const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ==========================================
// REUSABLE TASK MODAL COMPONENT
// ==========================================

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Partial<Assignment>) => void;
  initialData?: Assignment | null;
  title: string;
  members: Member[];
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  members,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('essay');
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Not Started');

  useEffect(() => {
    if (initialData) {
      setTaskTitle(initialData.title || '');
      setCategory(initialData.category || 'essay');
      setSelectedMemberName(initialData.member?.name || members[0]?.name || '');
      setStartDate(initialData.startDate || '');
      setDueDate(initialData.dueDate || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'Not Started');
    } else {
      setTaskTitle('');
      setCategory('essay');
      setSelectedMemberName(members[0]?.name || '');
      setStartDate('');
      setDueDate('');
      setDescription('');
      setStatus('Not Started');
    }
  }, [initialData, isOpen, members]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !dueDate || !selectedMemberName) return;

    // Tìm đối tượng Member đầy đủ từ danh sách được chọn
    const matchedMember =
      members.find((m) => m.name === selectedMemberName) || {
        userId: 0,
        name: selectedMemberName,
        initials: selectedMemberName.substring(0, 2).toUpperCase(),
      };

    onSubmit({
      title: taskTitle,
      category,
      description,
      startDate,
      dueDate,
      status,
      member: matchedMember,
      dueStatusText: status === 'Completed' ? 'Completed' : 'Upcoming',
      dueStatusColorClass: status === 'Completed' ? 'text-emerald-800 font-bold' : 'text-gray-700',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in duration-150">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-slate-200/50 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Essay: Global Economic Trends"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white"
              >
                <option value="essay">Essay</option>
                <option value="phonetics">Phonetics</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="grammar">Grammar</option>
              </select>
            </div>

            {/* YÊU CẦU 3: DROPDOWN DANH SÁCH THÀNH VIÊN */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Assigned Member <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={selectedMemberName}
                onChange={(e) => setSelectedMemberName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white"
              >
                {members.map((m) => (
                  <option key={m.userId} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Start Date (Optional)
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the task..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-600 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
