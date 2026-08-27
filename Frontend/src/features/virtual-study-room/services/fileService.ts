import axios from 'axios';

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
export const uploadFiles = async (
  groupId: string,
  files: File[],
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  
  const rawToken = localStorage.getItem('token') || localStorage.getItem('accessToken') || '';
// Remove potential surrounding quotes or extra 'Bearer ' prefix
  const token = rawToken.replace(/^"|"$/g, '').replace(/^Bearer\s+/i, '');

  const response = await axios.post<UploadResponse>(
    `${API_URL}/api/files/upload/${groupId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(progress);
        }
      },
    }
  );
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