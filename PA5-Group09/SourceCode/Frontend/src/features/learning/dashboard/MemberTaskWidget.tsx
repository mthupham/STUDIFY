import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApiErrorMessage,
  studyGroupApi,
  type GroupScheduleDto,
  type GroupTaskDto,
} from "../../virtual-study-room/services/studyGroupApi";

const STATUS_LABEL: Record<GroupTaskDto["status"], string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

function dueLabel(dueAt: string) {
  const due = new Date(dueAt);
  const days = Math.ceil((due.getTime() - Date.now()) / 86_400_000);
  if (days < 0) return "Overdue";
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

export default function MemberTaskWidget() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<GroupTaskDto[]>([]);
  const [schedules, setSchedules] = useState<GroupScheduleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      setLoading(true);
      setError("");
      try {
        const groups = await studyGroupApi.getMyGroups();
        const groupItems = await Promise.all(
          groups.map(async (group) => {
            const [groupTasks, groupSchedules] = await Promise.all([
              studyGroupApi.getTasks(group.id),
              studyGroupApi.getUpcomingSchedules(group.id),
            ]);
            return { tasks: groupTasks, schedules: groupSchedules };
          }),
        );
        if (!cancelled) {
          setTasks(groupItems.flatMap((item) => item.tasks));
          setSchedules(groupItems.flatMap((item) => item.schedules));
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(getApiErrorMessage(requestError, "Unable to load group notifications."));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadTasks();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleTasks = useMemo(
    () => tasks.filter((task) => task.status !== "COMPLETED").slice(0, 4),
    [tasks],
  );

  return (
    <section className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm">
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-300/10" />
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
          Group Notifications
        </h3>
        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800">
          {visibleTasks.length + schedules.length} new
        </span>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading group notifications...</p>}
      {error && <p className="text-sm text-rose-700">{error}</p>}
      {!loading && !error && visibleTasks.length === 0 && schedules.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-gray-500">
          You have no group tasks or upcoming sessions.
        </p>
      )}

      {!loading && !error && visibleTasks.map((task) => (
        <button
          key={task.id}
          type="button"
          onClick={() => navigate(`/study-groups/${task.groupId}/workspace-member`)}
          className="flex w-full flex-col gap-2 rounded-xl border border-emerald-800/10 bg-emerald-300/20 p-4 text-left transition hover:border-emerald-700/30 hover:bg-emerald-300/30"
        >
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-bold text-emerald-950">{task.title}</h4>
            <span className="shrink-0 rounded bg-white/70 px-2 py-0.5 text-[11px] font-bold text-emerald-900">
              {STATUS_LABEL[task.status]}
            </span>
          </div>
          {task.description && (
            <p className="line-clamp-2 text-sm leading-5 text-emerald-900/80">
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between border-t border-emerald-800/10 pt-2 text-xs font-semibold text-emerald-800">
            <span>{dueLabel(task.dueAt)}</span>
            <span>Open group →</span>
          </div>
        </button>
      ))}

      {!loading && !error && schedules.slice(0, 3).map((schedule) => (
        <button
          key={`schedule-${schedule.id}`}
          type="button"
          onClick={() => navigate(`/study-groups/${schedule.groupId}/workspace-member`)}
          className="flex w-full flex-col gap-2 rounded-xl border border-sky-200 bg-sky-50 p-4 text-left transition hover:bg-sky-100"
        >
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-bold text-sky-950">{schedule.title}</h4>
            <span className="shrink-0 rounded bg-white px-2 py-0.5 text-[11px] font-bold text-sky-800">
              Study session
            </span>
          </div>
          {schedule.description && (
            <p className="line-clamp-2 text-sm text-sky-900/80">{schedule.description}</p>
          )}
          <div className="flex items-center justify-between border-t border-sky-200 pt-2 text-xs font-semibold text-sky-800">
            <span>{new Date(schedule.startAt).toLocaleString()}</span>
            <span>Open group →</span>
          </div>
        </button>
      ))}
    </section>
  );
}
