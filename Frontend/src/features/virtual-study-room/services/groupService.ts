import axios from "axios";

const envApiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const apiBaseUrl = envApiUrl.replace(/\/+$/, "");

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GroupMemberUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface GroupMember {
  userId: number;
  role: "LEADER" | "MEMBER";
  joinedAt: string;
  user: GroupMemberUser | null;
}

export interface StudyGroup {
  id: number;
  name: string;
  description: string | null;
  icon: string;
  code: string;
  createdBy: number;
  members?: GroupMember[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GroupDetail {
  group: StudyGroup;
  currentUserRole: "LEADER" | "MEMBER";
}

export interface CreateGroupResponse {
  status: string;
  message: string;
  data: {
    group: StudyGroup;
    member: {
      userId: number;
      role: string;
      joinedAt: string;
    };
  };
}

// ─── API Calls ───────────────────────────────────────────────────────────────

/** UC1: Tạo nhóm học mới */
export async function createGroup(
  token: string,
  name: string,
  description: string | null,
  icon: string,
): Promise<CreateGroupResponse> {
  const response = await axios.post(
    `${apiBaseUrl}/groups`,
    { name, description, icon },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}

/** Lấy danh sách nhóm của user hiện tại */
export async function getMyGroups(token: string): Promise<StudyGroup[]> {
  const response = await axios.get(`${apiBaseUrl}/groups/my-groups`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data?.data ?? [];
}

/** F3.2: Lấy chi tiết group + danh sách members + role hiện tại của user */
export async function getGroupDetails(
  token: string,
  groupId: number,
): Promise<GroupDetail> {
  const response = await axios.get(`${apiBaseUrl}/groups/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data?.data;
}

/** F3.2: Cập nhật thông tin group (Leader only) */
export async function updateGroup(
  token: string,
  groupId: number,
  data: { name?: string; description?: string | null; icon?: string },
): Promise<StudyGroup> {
  const response = await axios.patch(
    `${apiBaseUrl}/groups/${groupId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data?.data;
}

/** F3.2: Đổi role của member (Leader only) */
export async function changeMemberRole(
  token: string,
  groupId: number,
  userId: number,
  role: "LEADER" | "MEMBER",
): Promise<void> {
  await axios.patch(
    `${apiBaseUrl}/groups/${groupId}/members/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
}

/** F3.2: Xóa member khỏi group (Leader only) */
export async function removeMember(
  token: string,
  groupId: number,
  userId: number,
): Promise<void> {
  await axios.delete(`${apiBaseUrl}/groups/${groupId}/members/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}