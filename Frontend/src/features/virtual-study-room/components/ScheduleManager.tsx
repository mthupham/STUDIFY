import React, { useEffect, useState } from "react";
import {
  getApiErrorMessage,
  studyGroupApi,
  type GroupScheduleDto,
  type SchedulePayload,
} from "../services/studyGroupApi";

interface Props {
  groupId: number;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  startAt: "",
  endAt: "",
  locationOrLink: "",
};

function toLocalInput(date: string) {
  const parsed = new Date(date);
  const offset = parsed.getTimezoneOffset() * 60_000;
  return new Date(parsed.getTime() - offset).toISOString().slice(0, 16);
}

export default function ScheduleManager({ groupId }: Props) {
  const [items, setItems] = useState<GroupScheduleDto[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setItems(await studyGroupApi.getSchedules(groupId));
      setError("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to load the study schedule."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const closeForm = () => {
    setOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const edit = (item: GroupScheduleDto) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description ?? "",
      startAt: toLocalInput(item.startAt),
      endAt: toLocalInput(item.endAt),
      locationOrLink: item.locationOrLink ?? "",
    });
    setOpen(true);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload: SchedulePayload = {
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      startAt: new Date(form.startAt).toISOString(),
      endAt: new Date(form.endAt).toISOString(),
      locationOrLink: form.locationOrLink.trim() || undefined,
    };

    try {
      if (editingId) {
        await studyGroupApi.updateSchedule(groupId, editingId, payload);
      } else {
        await studyGroupApi.createSchedule(groupId, payload);
      }
      closeForm();
      await load();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to save the study session."));
    }
  };

  const remove = async (scheduleId: number) => {
    try {
      await studyGroupApi.deleteSchedule(groupId, scheduleId);
      setItems((current) => current.filter((item) => item.id !== scheduleId));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Unable to delete the study session."));
    }
  };

  return (
    <section className="rounded-2xl border border-slate-300 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Study Schedule</h2>
          <p className="text-sm text-gray-500">Plan group study sessions and meeting times.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
        >
          + Add Session
        </button>
      </div>

      {error && <p className="mx-6 mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="divide-y divide-slate-100">
        {loading && <p className="p-6 text-sm text-gray-500">Loading schedule...</p>}
        {!loading && items.length === 0 && (
          <p className="p-6 text-sm text-gray-500">No study sessions scheduled yet.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.description || "No description"}</p>
              <p className="mt-2 text-xs font-medium text-sky-700">
                {new Date(item.startAt).toLocaleString()} – {new Date(item.endAt).toLocaleString()}
              </p>
              {item.locationOrLink && <p className="mt-1 text-xs text-gray-500">{item.locationOrLink}</p>}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => edit(item)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-slate-50">
                Edit
              </button>
              <button type="button" onClick={() => void remove(item.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <form onSubmit={submit} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900">{editingId ? "Edit Study Session" : "Add Study Session"}</h3>
            <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Session title" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required type="datetime-local" value={form.startAt} onChange={(event) => setForm({ ...form, startAt: event.target.value })} className="rounded-lg border border-slate-300 px-3 py-2" />
              <input required type="datetime-local" value={form.endAt} onChange={(event) => setForm({ ...form, endAt: event.target.value })} className="rounded-lg border border-slate-300 px-3 py-2" />
            </div>
            <input value={form.locationOrLink} onChange={(event) => setForm({ ...form, locationOrLink: event.target.value })} placeholder="Location or meeting link" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={closeForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Cancel</button>
              <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">Save Session</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
