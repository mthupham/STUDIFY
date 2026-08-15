import React, { useState, useEffect } from "react";
import { downloadFile as apiDownloadFile, getCleanFileName } from "../services/fileService";

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "doc" | "docx" | "folder" | "image" | "video" | "link" | string;
  category: "photo" | "video" | "file" | "link";
  sender?: string;
  senderAvatar?: string;
  uploadedDate?: string;
  icon?: React.ReactNode;
  url?: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  members?: Member[];
  groupId?: string;
}

type FilterType = "all" | "photo" | "video" | "file" | "link";

const FILTER_TABS: { label: string; value: FilterType }[] = [
  { label: "All Files", value: "all" },
  { label: "Photos", value: "photo" },
  { label: "Videos", value: "video" },
  { label: "Files", value: "file" },
  { label: "Links", value: "link" },
];

export const FileViewerModal: React.FC<FileViewerModalProps> = ({
  isOpen,
  onClose,
  files,
  members = [],
  groupId = "1",
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [filterType, setFilterType] = useState<"none" | "sender" | "date">("none");
  const [selectedSender, setSelectedSender] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const extractStoredFileName = (file: FileItem): string => {
    if (!file.url) return file.name;
    try {
      const parsed = new URL(file.url);
      const parts = parsed.pathname.split("/files/");
      if (parts.length > 1) {
        return decodeURIComponent(parts[1]);
      }
    } catch {
      // Fallback
    }
    return file.name;
  };

  const handleDownloadSingle = async (file: FileItem) => {
    if (file.category === "link" || file.type === "link") {
      if (file.url) window.open(file.url, "_blank", "noopener,noreferrer");
      return;
    }

    const storedFileName = extractStoredFileName(file);
    const cleanName = getCleanFileName(file.name);

    try {
      await apiDownloadFile(groupId, storedFileName, cleanName);
    } catch (err) {
      console.error("Download failed:", err);
      alert(`Failed to download ${cleanName}`);
    }
  };

  const handleDownloadAll = () => {
    const downloadableFiles = filteredFiles.filter((f) => f.category !== "link");
    if (downloadableFiles.length === 0) {
      alert("No downloadable files available.");
      return;
    }

    downloadableFiles.forEach((file, index) => {
      setTimeout(() => {
        handleDownloadSingle(file);
      }, index * 400);
    });
  };

  const filteredFiles = files.filter((file) => {
    if (activeFilter !== "all" && file.category !== activeFilter) return false;
    if (filterType === "sender" && selectedSender && file.sender !== selectedSender) return false;
    if (filterType === "date" && file.uploadedDate) {
      const fileDate = new Date(file.uploadedDate).getTime();
      if (isNaN(fileDate)) return true;
      if (fromDate && fileDate < new Date(fromDate).getTime()) return false;
      if (toDate && fileDate > new Date(toDate).getTime() + 86400000) return false;
    }
    return true;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      case "image":
      case "photo":
        return <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
      default:
        return <svg className="w-6 h-6 text-sky-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-900">Shared Files</h2>
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-6 pt-4 border-b border-slate-200 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeFilter === tab.value ? "bg-sky-700 text-white" : "text-gray-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Files Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">No files found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleDownloadSingle(file)}
                  className="p-4 border border-slate-200 rounded-xl hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3"
                >
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-sky-700">
                      {getCleanFileName(file.name)}
                    </h3>
                    <div className="text-xs text-gray-500 mt-0.5">{file.size}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadSingle(file);
                    }}
                    className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-sky-700 hover:bg-sky-50 rounded-lg shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-slate-100">
            Close
          </button>
          <button onClick={handleDownloadAll} className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-lg">
            Download All
          </button>
        </div>
      </div>
    </div>
  );
};