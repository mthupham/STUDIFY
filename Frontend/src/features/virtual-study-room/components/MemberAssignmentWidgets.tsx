import { useEffect, useState } from "react";
import {
  getApiErrorMessage,
  studyGroupApi,
  type ApiTaskStatus,
  type GroupScheduleDto,
  type GroupTaskDto,
} from "../services/studyGroupApi";

export default function MemberAssignmentWidgets({ groupId }: { groupId: number }) {
  const [tasks, setTasks] = useState<GroupTaskDto[]>([]);
  const [schedules, setSchedules] = useState<GroupScheduleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [taskItems, scheduleItems] = await Promise.all([
        studyGroupApi.getMyTasks(groupId),
        studyGroupApi.getUpcomingSchedules(groupId),
      ]);
      setTasks(taskItems.filter((task) => task.status !== "COMPLETED"));
      setSchedules(scheduleItems);
      setError("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to load assignments."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const updateStatus = async (taskId: number, status: ApiTaskStatus) => {
    try {
      await studyGroupApi.updateTaskStatus(groupId, taskId, status);
      await load();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to update task status."));
    }
  };

  return (
    <>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">My Tasks</h3>
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-700">{tasks.length}</span>
        </div>
        {loading && <p className="text-xs text-gray-500">Loading assignments...</p>}
        {error && <p className="rounded-lg bg-red-50 p-2 text-xs text-red-700">{error}</p>}
        {!loading && tasks.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-gray-500">No pending group tasks.</p>}
        {tasks.slice(0, 5).map((task) => {
          const overdue = new Date(task.dueAt).getTime() < Date.now();
          return (
            <article key={task.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
              <p className={`mt-1 text-xs font-medium ${overdue ? "text-red-700" : "text-gray-500"}`}>
                {overdue ? "Overdue · " : "Due · "}{new Date(task.dueAt).toLocaleString()}
              </p>
              <div className="mt-3 flex gap-2">
                {task.status === "NOT_STARTED" && (
                  <button type="button" onClick={() => void updateStatus(task.id, "IN_PROGRESS")} className="rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100">
                    Start
                  </button>
                )}
                <button type="button" onClick={() => void updateStatus(task.id, "COMPLETED")} className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
                  Complete
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Upcoming Sessions</h3>
        {!loading && schedules.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-gray-500">No upcoming study sessions.</p>}
        {schedules.slice(0, 3).map((schedule) => (
          <article key={schedule.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-900">{schedule.title}</h4>
            <p className="mt-1 text-xs font-medium text-sky-700">{new Date(schedule.startAt).toLocaleString()}</p>
            {schedule.locationOrLink && <p className="mt-1 truncate text-xs text-gray-500">{schedule.locationOrLink}</p>}
          </article>
        ))}
      </section>
    </>
  );
}
