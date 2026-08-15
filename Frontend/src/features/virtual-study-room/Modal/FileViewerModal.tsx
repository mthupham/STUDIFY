import React, { useState, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [filterType, setFilterType] = useState<"none" | "sender" | "date">("none");
  const [selectedSender, setSelectedSender] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getGroupIdFromUrl = (urlStr: string): string | null => {
    try {
      const match = urlStr.match(/\/groups\/([^/]+)\/files\//);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const getFileNameFromUrl = (urlStr: string): string | null => {
    try {
      const parsed = new URL(urlStr);
      const parts = parsed.pathname.split("/files/");
      if (parts.length > 1) {
        return decodeURIComponent(parts[1]);
      }
      return null;
    } catch {
      return null;
    }
  };

  const downloadFile = (file: FileItem) => {
    if (!file.url) {
      alert(`Download URL not available for ${file.name}`);
      return;
    }

    // Handle standard web links directly
    if (file.category === "link" || file.type === "link") {
      window.open(file.url, "_blank", "noopener,noreferrer");
      return;
    }

    const groupId = getGroupIdFromUrl(file.url);
    const fileName = getFileNameFromUrl(file.url);

    if (!groupId || !fileName) {
      window.open(file.url, "_blank", "noopener,noreferrer");
      return;
    }

    const downloadUrl = `${API_URL}/api/files/download-file/${groupId}/${encodeURIComponent(fileName)}`;
    
    // Use dynamic anchor to prevent window popup blocking issues where possible
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSingle = (file: FileItem) => {
    downloadFile(file);
  };

  const handleDownloadAll = () => {
    const downloadableFiles = filteredFiles.filter((f) => f.url && f.category !== "link");
    if (downloadableFiles.length === 0) {
      alert("No downloadable file URLs available.");
      return;
    }

    // Sequentially trigger downloads with a small delay to avoid browser popup throttling
    downloadableFiles.forEach((file, index) => {
      setTimeout(() => {
        downloadFile(file);
      }, index * 300);
    });
  };

  const filteredFiles = files.filter((file) => {
    if (activeFilter !== "all" && file.category !== activeFilter) {
      return false;
    }

    if (filterType === "sender" && selectedSender && file.sender !== selectedSender) {
      return false;
    }

    if (filterType === "date" && file.uploadedDate) {
      const fileDate = new Date(file.uploadedDate).getTime();
      if (isNaN(fileDate)) return true;

      if (fromDate) {
        const from = new Date(fromDate).getTime();
        if (fileDate < from) return false;
      }
      if (toDate) {
        const to = new Date(toDate).getTime();
        if (fileDate > to + 86400000) return false;
      }
    }

    return true;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
      case "docx":
      case "doc":
        return (
          <svg className="w-6 h-6 text-sky-700" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
      case "sheet":
      case "xls":
      case "xlsx":
        return (
          <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
      case "slides":
      case "ppt":
      case "pptx":
        return (
          <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
      case "audio":
      case "mp3":
      case "wav":
      case "ogg":
      case "m4a":
      case "aac":
        return (
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "archive":
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
        return (
          <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case "text":
      case "txt":
      case "csv":
      case "md":
      case "rtf":
        return (
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "code":
      case "json":
      case "xml":
      case "js":
      case "html":
      case "css":
      case "py":
      case "java":
      case "c":
      case "cpp":
      case "rb":
      case "php":
      case "sh":
        return (
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "folder":
        return (
          <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        );
      case "image":
      case "photo":
        return (
          <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case "video":
        return (
          <svg className="w-6 h-6 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case "link":
        return (
          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-900">Shared Files</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-6 pt-4 border-b border-slate-200 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeFilter === tab.value
                  ? "bg-sky-700 text-white"
                  : "text-gray-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Advanced Filter:</label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value as "none" | "sender" | "date");
                setSelectedSender("");
                setFromDate("");
                setToDate("");
              }}
              className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white text-gray-900 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none font-medium"
            >
              <option value="none">None</option>
              <option value="sender">By Sender</option>
              <option value="date">By Date Range</option>
            </select>

            {filterType === "sender" && (
              <select
                value={selectedSender}
                onChange={(e) => setSelectedSender(e.target.value)}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white text-gray-900 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none"
              >
                <option value="">Select a member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            )}

            {filterType === "date" && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white text-gray-900 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none"
                />
                <span className="text-gray-400 text-sm">to</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white text-gray-900 focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0018 4.5h-2.25A2.25 2.25 0 0013.5 2.25H3.75A2.25 2.25 0 001.5 4.5v15A2.25 2.25 0 003.75 21h14.25A2.25 2.25 0 0021 18.75" />
              </svg>
              <p className="text-gray-500 text-sm">No files found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleDownloadSingle(file)}
                  className="p-4 border border-slate-200 rounded-xl hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-sky-700 transition-colors">
                        {file.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 flex-wrap">
                        {file.size && <span className="font-medium text-slate-600">{file.size}</span>}
                        {file.size && (file.sender || file.uploadedDate) && <span>•</span>}
                        {file.sender && (
                          <span className="flex items-center gap-1 truncate">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">{file.sender}</span>
                          </span>
                        )}
                        {file.uploadedDate && (
                          <span className="flex items-center gap-1 shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{file.uploadedDate}</span>
                          </span>
                        )}
                      </div>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Download All
          </button>
        </div>
      </div>
    </div>
  );
};