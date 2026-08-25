import React, { useState, useRef } from "react";
import { uploadFiles } from "../services/fileService";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], type: "image" | "file" | "folder") => void;
  groupId?: string;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  groupId = "1",
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeType, setActiveType] = useState<"image" | "file" | "folder">("file");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const triggerFileInput = (type: "image" | "file" | "folder") => {
    setActiveType(type);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";

      if (type === "image") {
        fileInputRef.current.accept = "image/*";
        fileInputRef.current.removeAttribute("webkitdirectory");
      } else if (type === "file") {
        fileInputRef.current.accept = "*/*";
        fileInputRef.current.removeAttribute("webkitdirectory");
      } else if (type === "folder") {
        fileInputRef.current.accept = "*/*";
        fileInputRef.current.setAttribute("webkitdirectory", "true");
      }

      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      await uploadFilesToServer(files, activeType);
    }
  };

  const uploadFilesToServer = async (
    files: File[],
    type: "image" | "file" | "folder"
  ) => {
    if (files.length > 10) {
      alert("You can upload a maximum of 10 files per request.");
      return;
    }

    const oversized = files.find((f) => f.size > 2 * 1024 * 1024);
    if (oversized) {
      alert(`File "${oversized.name}" exceeds the maximum size limit of 2 MB.`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const response = await uploadFiles(groupId, files, (progress) => {
        setUploadProgress(progress);
      });

      if (response.success) {
        onUpload(files, type);
        setUploading(false);
        setUploadProgress(0);
        onClose();
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Upload failed. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-gray-900">Share Content</h2>
          <button
            onClick={onClose}
            disabled={uploading}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-700 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Options */}
        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={() => triggerFileInput("image")}
            disabled={uploading}
            className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-sky-500 hover:bg-sky-50 transition-all flex items-center gap-3 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-3 bg-violet-100 rounded-lg group-hover:bg-violet-200 transition-colors">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-900">Images</span>
              <span className="text-xs text-gray-500">Share photos</span>
            </div>
          </button>

          <button
            onClick={() => triggerFileInput("file")}
            disabled={uploading}
            className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-sky-500 hover:bg-sky-50 transition-all flex items-center gap-3 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-3 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors">
              <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-900">Files</span>
              <span className="text-xs text-gray-500">PDFs, docs, videos, audio & more</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};