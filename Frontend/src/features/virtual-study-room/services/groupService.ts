import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface StudyGroup {
  id: number;
  name: string;
  code: string;
  createdBy: number;
  createdAt?: string;
  updatedAt?: string;
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

export async function getMyGroups(
  token: string,
): Promise<StudyGroup[]> {
  const response = await axios.get(
    `${apiBaseUrl}/groups/my-groups`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data?.data ?? [];
}

export async function createGroup(
  token: string,
  name: string,
  description: string | null,
  icon: string,
) {
  return axios.post(
    `${apiBaseUrl}/groups`,
    {
      name,
      description,
      icon,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
}