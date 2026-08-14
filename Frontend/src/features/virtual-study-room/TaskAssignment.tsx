import React, { useEffect, useState, useMemo } from "react";
import { TaskModal } from "./Modal/TaskModal";
import type { Assignment, TaskStatus, CategoryType, Member } from "./Modal/TaskModal";
import { useNavigate, useParams } from "react-router-dom";
import {
  getApiErrorMessage,
  studyGroupApi,
  type GroupTaskDto,
  type TaskPayload,
} from "./services/studyGroupApi";
import ScheduleManager from "./components/ScheduleManager";

// ==========================================
// INITIAL MOCK DATA
// ==========================================

const STATUS_FROM_API: Record<GroupTaskDto["status"], TaskStatus> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const CATEGORY_FROM_API: Record<GroupTaskDto["category"], CategoryType> = {
  ESSAY: "essay",
  PHONETICS: "phonetics",
  VOCABULARY: "vocabulary",
  GRAMMAR: "grammar",
};

function deadlinePresentation(dueAt: string, status: GroupTaskDto["status"]) {
  if (status === "COMPLETED") {
    return { text: "Completed", color: "text-emerald-800 font-bold" };
  }
  const days = Math.ceil((new Date(dueAt).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return { text: "Overdue", color: "text-red-700 font-bold" };
  if (days === 0) return { text: "Due today", color: "text-red-700 font-medium" };
  if (days === 1) return { text: "Tomorrow", color: "text-amber-700 font-medium" };
  return { text: `In ${days} days`, color: "text-gray-700" };
}

function toAssignment(task: GroupTaskDto, members: Member[]): Assignment {
  const due = deadlinePresentation(task.dueAt, task.status);
  const member = members.find((item) => item.userId === task.assignedTo) ?? {
    userId: task.assignedTo,
    name: `User #${task.assignedTo}`,
    initials: "U",
  };
  return {
    id: String(task.id),
    title: task.title,
    description: task.description ?? "",
    category: CATEGORY_FROM_API[task.category],
    member,
    startDate: task.startAt?.slice(0, 10),
    dueDate: task.dueAt.slice(0, 10),
    dueStatusText: due.text,
    dueStatusColorClass: due.color,
    status: STATUS_FROM_API[task.status],
    isDisabled: task.isHidden,
  };
}

// ==========================================
// SVG ICONS
// ==========================================

const PlusIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
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

const TrendingUpIcon: React.FC<{ className?: string }> = ({
  className = "w-3.5 h-3.5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0l7.734-7.734m0 0l-5.625 0m5.625 0v5.625"
    />
  </svg>
);

const FilterIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
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
      d="M10.5 6h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5m6-6h6m-6 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H10.5"
    />
  </svg>
);

const MoreHorizontalIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
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
      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

const MoreVerticalIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
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
      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
    />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({
  className = "w-3.5 h-3.5",
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
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({
  className = "w-3.5 h-3.5",
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
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({
  className = "w-3.5 h-3.5",
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
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.573 16.49 16.638 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ArrowLeftIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const CategoryIcon: React.FC<{
  category: CategoryType;
  isHighlighted?: boolean;
}> = ({ category, isHighlighted }) => {
  const iconClass = isHighlighted ? "w-5 h-5 text-white" : "w-5 h-5";

  switch (category) {
    case "essay":
      return (
        <svg
          className={`${iconClass} ${!isHighlighted ? "text-sky-700" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      );
    case "phonetics":
      return (
        <svg
          className={`${iconClass} ${!isHighlighted ? "text-amber-700" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 003-3V4.5a3 3 0 00-6 0v8.25a3 3 0 003 3z"
          />
        </svg>
      );
    case "vocabulary":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
          />
        </svg>
      );
    case "grammar":
      return (
        <svg
          className={`${iconClass} ${!isHighlighted ? "text-emerald-800" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  switch (status) {
    case "In Progress":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
          <svg
            className="w-3.5 h-3.5 text-emerald-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          In Progress
        </span>
      );
    case "Not Started":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200/70 text-gray-700 text-xs font-bold rounded-full">
          <svg
            className="w-3.5 h-3.5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Not Started
        </span>
      );
    case "Completed":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/10 border border-emerald-800/20 text-emerald-800 text-xs font-bold rounded-full">
          <svg
            className="w-3.5 h-3.5 text-emerald-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          Completed
        </span>
      );
    default:
      return null;
  }
};

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================

export const TaskAssignmentDashboard: React.FC = () => {
  const { groupId = "1" } = useParams();
  const numericGroupId = Number(groupId);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [groupName, setGroupName] = useState("Study Group");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const navigate = useNavigate();

  // States quản lý Modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Assignment | null>(null);

  // State quản lý Pop-up Action (Menu 3 chấm)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 4;

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [memberDtos, taskDtos, groupDetail] = await Promise.all([
        studyGroupApi.getMembers(numericGroupId),
        studyGroupApi.getTasks(numericGroupId),
        studyGroupApi.getGroup(numericGroupId),
      ]);
      const mappedMembers: Member[] = memberDtos.map((member) => ({
        userId: member.userId,
        name: member.name,
        avatarUrl: member.avatar ?? undefined,
        initials: member.name.slice(0, 2).toUpperCase(),
      }));
      setMembers(mappedMembers);
      setAssignments(taskDtos.map((task) => toAssignment(task, mappedMembers)));
      setGroupName(groupDetail.group.name);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to load task assignments."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Number.isInteger(numericGroupId) && numericGroupId > 0) {
      void loadData();
    } else {
      setError("Invalid study group ID.");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericGroupId]);

  const toPayload = (task: Partial<Assignment>): TaskPayload => ({
    title: task.title?.trim() || "Untitled Task",
    description: task.description?.trim() || undefined,
    category: (task.category || "essay").toUpperCase() as TaskPayload["category"],
    assignedTo: task.member?.userId ?? 0,
    startAt: task.startDate ? `${task.startDate}T00:00:00.000Z` : undefined,
    dueAt: `${task.dueDate}T23:59:59.000Z`,
  });

  // Tính số lượng Active Tasks (Task không bị ẩn và chưa hoàn thành)
  const activeTasksCount = useMemo(() => {
    return assignments.filter(
      (item) => !item.isDisabled && item.status !== "Completed",
    ).length;
  }, [assignments]);

  const completionPercent = assignments.length
    ? Math.round(
        (assignments.filter((item) => item.status === "Completed").length /
          assignments.length) *
          100,
      )
    : 0;

  const upcomingTask = useMemo(
    () =>
      assignments
        .filter((item) => item.status !== "Completed" && !item.isDisabled)
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        )[0],
    [assignments],
  );
  const upcomingDays = upcomingTask
    ? Math.max(
        0,
        Math.ceil(
          (new Date(upcomingTask.dueDate).getTime() - Date.now()) / 86_400_000,
        ),
      )
    : 0;

  // Phân trang giữ nguyên toàn bộ tasks (bao gồm cả task bị Hide)
  const totalPages = Math.ceil(assignments.length / ITEMS_PER_PAGE) || 1;

  const currentAssignments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return assignments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [assignments, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 150);
  };

  // Thêm mới Task
  const handleCreateTask = async (newTaskData: Partial<Assignment>) => {
    try {
      await studyGroupApi.createTask(numericGroupId, toPayload(newTaskData));
      setCurrentPage(1);
      await loadData();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to create the task."));
    }
  };

  // Chỉnh sửa Task
  const handleUpdateTask = async (updatedData: Partial<Assignment>) => {
    if (!editingTask) return;
    try {
      await studyGroupApi.updateTask(
        numericGroupId,
        Number(editingTask.id),
        toPayload(updatedData),
      );
      setEditingTask(null);
      await loadData();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to update the task."));
    }
  };

  // Xóa Task hoàn toàn
  const handleDeleteTask = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await studyGroupApi.deleteTask(numericGroupId, Number(id));
      setAssignments((prev) => prev.filter((task) => task.id !== id));
      setActiveMenuId(null);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to delete the task."));
    }
  };

  // YÊU CẦU 4: Ẩn/Hiện Task (Toggle Hide state mà không xóa khỏi bảng)
  const handleToggleHideTask = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const task = assignments.find((item) => item.id === id);
    if (!task) return;
    try {
      await studyGroupApi.setTaskVisibility(
        numericGroupId,
        Number(id),
        !task.isDisabled,
      );
      setAssignments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isDisabled: !item.isDisabled } : item,
        ),
      );
      setActiveMenuId(null);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to change task visibility."));
    }
  };

  return (
    <main className="w-full mx-auto flex flex-col gap-8 font-['Inter'] text-gray-900 p-4">
      {/* Top Navigation */}
      <div>
        <button
          onClick={() => navigate(`/study-groups/${groupId}/workspace-leader`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors -ml-3"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Workspace</span>
        </button>
      </div>
      {/* ---------------- SECTION 1: HEADER ---------------- */}
      <header className="flex justify-between items-end gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold leading-10 text-gray-900">
            Task Assignment
          </h1>
          <p className="text-lg font-normal leading-7 text-gray-700">
            Manage weekly deliverables for the{" "}
            <span className="text-sky-700 font-medium">
              {groupName}
            </span>{" "}
            group.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAssignModalOpen(true)}
          className="px-5 py-3 bg-sky-700 hover:bg-sky-800 text-white text-base font-medium rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <PlusIcon className="w-5 h-5 text-white" />
          <span>Assign New Task</span>
        </button>
      </header>

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-gray-500">
          Loading task assignments...
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ---------------- SECTION 2: BENTO STATS GRID ---------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-300/30 flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Active Tasks
          </span>
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-sky-700 leading-tight">
              {activeTasksCount < 10
                ? `0${activeTasksCount}`
                : activeTasksCount}
            </span>
            <div className="flex items-center gap-1 text-emerald-800 text-sm font-bold">
              <TrendingUpIcon />
              <span>{assignments.length}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-300/30 flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Pending Peer Reviews
          </span>
          <div className="pt-2">
            <span className="text-5xl font-bold text-amber-800 leading-tight">
              00
            </span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-300/30 flex flex-col justify-between">
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Group Completion
          </span>
          <div className="pt-2 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-900">Progress</span>
              <span className="font-bold text-gray-900">{completionPercent}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-700 rounded-full transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-blue-600 rounded-xl shadow-sm text-white flex flex-col justify-between">
          <span className="text-xs font-medium text-white/80 uppercase tracking-wide">
            Upcoming Deadline
          </span>
          <div className="pt-2 flex flex-col gap-1">
            <p className="text-base font-normal leading-6">
              {upcomingTask?.title || "No upcoming tasks"}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl font-bold leading-none">
                {String(upcomingDays).padStart(2, "0")}
              </span>
              <span className="text-2xl font-semibold opacity-80">days</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: DASHBOARD TABLE ---------------- */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-300 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">
            Current Assignments
          </h2>
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

        <div className="overflow-x-auto min-h-[320px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/60 border-b border-slate-200 text-xs font-bold text-gray-700 uppercase tracking-wide">
                <th scope="col" className="px-6 py-4">
                  Task Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Assigned Member
                </th>
                <th scope="col" className="px-6 py-4">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-slate-200/60 transition-opacity duration-150 ${
                isAnimating ? "opacity-30" : "opacity-100"
              }`}
            >
              {currentAssignments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500 text-sm"
                  >
                    No assignments available.
                  </td>
                </tr>
              ) : (
                currentAssignments.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setEditingTask(item)}
                    /* YÊU CẦU 4: Làm mờ Task khi bị Hide (isDisabled) */
                    className={`cursor-pointer transition-all ${
                      item.isDisabled
                        ? "opacity-40 grayscale bg-slate-100/60 hover:opacity-60"
                        : item.isHighlighted
                          ? "bg-sky-700/5 hover:bg-sky-700/10"
                          : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Tiêu đề & Loại Task */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            item.isHighlighted
                              ? "bg-sky-700"
                              : item.category === "phonetics"
                                ? "bg-amber-700/10"
                                : item.category === "grammar"
                                  ? "bg-emerald-300/20"
                                  : "bg-blue-600/10"
                          }`}
                        >
                          <CategoryIcon
                            category={item.category}
                            isHighlighted={item.isHighlighted}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-base font-normal text-gray-900 leading-snug">
                              {item.title}
                            </p>
                            {item.isDisabled && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                                Hidden
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs font-normal text-gray-500 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
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
                            {item.member.initials || "U"}
                          </div>
                        )}
                        <span
                          className={`text-base text-gray-900 ${item.member.isCurrentUser ? "font-semibold" : "font-normal"}`}
                        >
                          {item.member.name}
                        </span>
                      </div>
                    </td>

                    {/* Ngày hết hạn */}
                    <td className="px-6 py-4">
                      <p className="text-base font-normal text-gray-900">
                        {item.dueDate}
                      </p>
                      <p className={`text-xs ${item.dueStatusColorClass}`}>
                        {item.dueStatusText}
                      </p>
                    </td>

                    {/* Trạng thái công việc */}
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Thao tác (Actions Pop-up) */}
                    <td className="px-6 py-4 text-right relative">
                      <button
                        type="button"
                        aria-label="Task options"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(
                            activeMenuId === item.id ? null : item.id,
                          );
                        }}
                        className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-slate-200/50"
                      >
                        <MoreVerticalIcon />
                      </button>

                      {/* YÊU CẦU 1: POP-UP */}
                      {activeMenuId === item.id && (
                        <div
                          className="absolute right-6 top-10 w-28 bg-white rounded-lg shadow-md border border-slate-200 py-1 z-30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={(e) => handleToggleHideTask(item.id, e)}
                            className="w-full px-2.5 py-1.5 text-left text-xs text-gray-700 hover:bg-slate-100 flex items-center gap-2 transition-colors font-medium"
                          >
                            {item.isDisabled ? (
                              <>
                                <EyeIcon className="w-4 h-4 text-gray-500" />
                                <span>Unhide Task</span>
                              </>
                            ) : (
                              <>
                                <EyeOffIcon className="w-4 h-4 text-gray-500" />
                                <span>Hide Task</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteTask(item.id, e)}
                            className="w-full px-2.5 py-1.5 text-left text-xs text-gray-700 hover:bg-slate-100 flex items-center gap-2 transition-colors font-medium"
                          >
                            <TrashIcon className="w-4 h-4 text-red-500" />
                            <span>Delete Task</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <footer className="p-6 bg-slate-50 border-t border-slate-300 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-700">
            Showing{" "}
            {assignments.length > 0
              ? (currentPage - 1) * ITEMS_PER_PAGE + 1
              : 0}{" "}
            - {Math.min(currentPage * ITEMS_PER_PAGE, assignments.length)} of{" "}
            {assignments.length} assignments
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold transition-colors ${
                currentPage === 1
                  ? "opacity-50 text-gray-400 cursor-not-allowed"
                  : "text-gray-900 hover:bg-slate-100 cursor-pointer"
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold transition-colors ${
                currentPage >= totalPages
                  ? "opacity-50 text-gray-400 cursor-not-allowed"
                  : "text-gray-900 hover:bg-slate-100 cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </footer>
      </section>

      <ScheduleManager groupId={numericGroupId} />

      {/* ---------------- SECTION 4: MODALS ---------------- */}
      <TaskModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSubmit={handleCreateTask}
        title="Assign New Task"
        members={members}
      />

      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
        title="Task Details & Edit"
        members={members}
      />
    </main>
  );
};

export default TaskAssignmentDashboard;
