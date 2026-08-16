import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface BackendFileItem {
  id: string;
  name: string; // Stored filename with timestamp prefix (e.g. 1786775305270-feature1_updated.txt)
  size: string;
  createdAt: string;
  uploadedBy: string;
  url: string;
  mimetype: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  files: Array<{
    name: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
  }>;
}

export interface ListResponse {
  success: boolean;
  files: BackendFileItem[];
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  fileName: string;
}

// 1. Add this interface
export interface UploadOptions {
  uploadedBy?: string;
  onProgress?: (progress: number) => void;
}

/**
 * Strips the timestamp prefix from stored filename for clean user display.
 * Example: "1786775305270-feature1.txt" -> "feature1.txt"
 */
export const getCleanFileName = (storedName: string): string => {
  return storedName.replace(/^\d+-/, '');
};

/**
 * 1. Upload one or multiple files
 */
export const uploadFiles = async (groupId: string, formData: FormData) => {
  // 1. Get token from storage (check your exact key name: 'token' or 'access_token')
  const rawToken = localStorage.getItem('access_token') || localStorage.getItem('token');
  
  // Clean token string in case it's stringified JSON or has quotes
  const token = rawToken?.replace(/^"|"$/g, '').replace(/^Bearer\s+/i, '');

  // 2. Pass Authorization header in request config
  const response = await axios.post(`http://localhost:3000/api/files/upload/${groupId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, // 👈 THIS WAS MISSING
    },
  });

  return response.data;
};

/**
 * 2. Get files for a study group
 */
export const getGroupFiles = async (groupId: string): Promise<BackendFileItem[]> => {
  const response = await axios.get<ListResponse>(`${API_URL}/api/files/list/${groupId}`);
  return response.data.files || [];
};

/**
 * 4. Download binary file via NestJS proxy endpoint
 */
export const downloadFile = async (
  groupId: string,
  storedFileName: string,
  displayFileName?: string
): Promise<void> => {
  const encodedFileName = encodeURIComponent(storedFileName);
  const response = await axios.get(
    `${API_URL}/api/files/download-file/${groupId}/${encodedFileName}`,
    {
      responseType: 'blob',
    }
  );

  const cleanName = displayFileName || getCleanFileName(storedFileName);

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', cleanName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * 5. Delete file from group storage
 */
export const deleteFile = async (
  groupId: string,
  storedFileName: string
): Promise<DeleteResponse> => {
  const encodedFileName = encodeURIComponent(storedFileName);
  const response = await axios.delete<DeleteResponse>(
    `${API_URL}/api/files/${groupId}/${encodedFileName}`
  );
  return response.data;
};