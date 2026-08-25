import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
});

export type GroupRole = "LEADER" | "MEMBER";
export type ApiTaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type ApiTaskCategory = "ESSAY" | "PHONETICS" | "VOCABULARY" | "GRAMMAR";

export interface StudyGroupSummary {
  id: number;
  name: string;
  code: string;
  createdBy: number;
  role: GroupRole;
  joinedAt: string;
  membersCount: number;
  description: string | null;
  icon: string;
  members?: GroupMemberDto[];
}

export interface StudyGroupDetailResponse {
  group: Omit<StudyGroupSummary, "role" | "joinedAt">;
  membership: {
    userId: number;
    role: GroupRole;
    joinedAt: string;
  };
}

interface StudyGroupDetailApiResponse {
  status: string;
  data: StudyGroupDetailResponse;
}

export interface GroupMemberDto {
  userId: number;
  name: string;
  email: string;
  avatar: string | null;
  role: GroupRole;
  joinedAt: string;
}

export interface GroupTaskDto {
  id: number;
  groupId: number;
  title: string;
  description: string | null;
  category: ApiTaskCategory;
  assignedTo: number;
  createdBy: number;
  startAt: string | null;
  dueAt: string;
  status: ApiTaskStatus;
  completedAt: string | null;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  category: ApiTaskCategory;
  assignedTo: number;
  startAt?: string;
  dueAt: string;
  status?: ApiTaskStatus;
}

export interface GroupScheduleDto {
  id: number;
  groupId: number;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  locationOrLink: string | null;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface SchedulePayload {
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  locationOrLink?: string;
}

export const studyGroupApi = {
  async getMyGroups() {
    const { data } = await axios.get<{ items: StudyGroupSummary[] }>(
      `${API_BASE}/groups/me`,
      { headers: authHeaders() },
    );

    return data.items ?? [];
  },

  async getGroup(groupId: number) {
    const { data } = await axios.get<StudyGroupDetailApiResponse>(
      `${API_BASE}/groups/${groupId}`,
      { headers: authHeaders() },
    );
    return data.data;
  },

  async getMembers(groupId: number) {
    const { data } = await axios.get<{ items: GroupMemberDto[] }>(
      `${API_BASE}/groups/${groupId}/members`,
      { headers: authHeaders() },
    );
    return data.items;
  },

  async getTasks(groupId: number) {
    const { data } = await axios.get<GroupTaskDto[]>(
      `${API_BASE}/groups/${groupId}/tasks`,
      { headers: authHeaders() },
    );
    return data;
  },

  async getMyTasks(groupId: number) {
    const { data } = await axios.get<GroupTaskDto[]>(
      `${API_BASE}/groups/${groupId}/tasks/me`,
      { headers: authHeaders() },
    );
    return data;
  },

  async getAllMyTasks() {
    const { data } = await axios.get<GroupTaskDto[]>(`${API_BASE}/tasks/me`, {
      headers: authHeaders(),
    });
    return data;
  },

  async createTask(groupId: number, payload: TaskPayload) {
    const { data } = await axios.post<GroupTaskDto>(
      `${API_BASE}/groups/${groupId}/tasks`,
      payload,
      { headers: authHeaders() },
    );
    return data;
  },

  async updateTask(
    groupId: number,
    taskId: number,
    payload: Partial<TaskPayload>,
  ) {
    const { data } = await axios.patch<GroupTaskDto>(
      `${API_BASE}/groups/${groupId}/tasks/${taskId}`,
      payload,
      { headers: authHeaders() },
    );
    return data;
  },

  async updateTaskStatus(
    groupId: number,
    taskId: number,
    status: ApiTaskStatus,
  ) {
    const { data } = await axios.patch<GroupTaskDto>(
      `${API_BASE}/groups/${groupId}/tasks/${taskId}/status`,
      { status },
      { headers: authHeaders() },
    );
    return data;
  },

  async setTaskVisibility(groupId: number, taskId: number, isHidden: boolean) {
    const { data } = await axios.patch<GroupTaskDto>(
      `${API_BASE}/groups/${groupId}/tasks/${taskId}/visibility`,
      { isHidden },
      { headers: authHeaders() },
    );
    return data;
  },

  async deleteTask(groupId: number, taskId: number) {
    await axios.delete(`${API_BASE}/groups/${groupId}/tasks/${taskId}`, {
      headers: authHeaders(),
    });
  },

  async getSchedules(groupId: number) {
    const { data } = await axios.get<GroupScheduleDto[]>(
      `${API_BASE}/groups/${groupId}/schedules`,
      { headers: authHeaders() },
    );
    return data;
  },

  async getUpcomingSchedules(groupId: number) {
    const { data } = await axios.get<GroupScheduleDto[]>(
      `${API_BASE}/groups/${groupId}/schedules/upcoming`,
      { headers: authHeaders() },
    );
    return data;
  },

  async createSchedule(groupId: number, payload: SchedulePayload) {
    const { data } = await axios.post<GroupScheduleDto>(
      `${API_BASE}/groups/${groupId}/schedules`,
      payload,
      { headers: authHeaders() },
    );
    return data;
  },

  async updateSchedule(
    groupId: number,
    scheduleId: number,
    payload: Partial<SchedulePayload>,
  ) {
    const { data } = await axios.patch<GroupScheduleDto>(
      `${API_BASE}/groups/${groupId}/schedules/${scheduleId}`,
      payload,
      { headers: authHeaders() },
    );
    return data;
  },

  async deleteSchedule(groupId: number, scheduleId: number) {
    await axios.delete(
      `${API_BASE}/groups/${groupId}/schedules/${scheduleId}`,
      {
        headers: authHeaders(),
      },
    );
  },
};

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError(error)) return fallback;
  const message = error.response?.data?.message;
  return Array.isArray(message) ? message.join(", ") : message || fallback;
}
