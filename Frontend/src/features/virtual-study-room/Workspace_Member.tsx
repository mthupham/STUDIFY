import React, { useEffect, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useGroupChat } from "./hooks/useGroupChat";
import MemberAssignmentWidgets from "./components/MemberAssignmentWidgets";
import { studyGroupApi } from "./services/studyGroupApi";
import type { StudyGroup } from "./services/groupService";

interface BusinessEnglishHubProps {
  groupId: number;
  groupData: StudyGroup;
}
import { FileViewerModal, type FileItem } from "./Modal/FileViewerModal";
import { FileUploadModal } from "./Modal/FileUploadModal";
import { CreatePollModal } from "./Modal/CreatePollModal";

const GROUP_ID = "b2-business-english-hub";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function mapApiFileToFileItem(file: {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  url: string;
  mimetype?: string;
  uploadedBy?: string;
}): FileItem {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = file.mimetype ?? "";

  let type = ext;
  let category: FileItem["category"] = "file";

  if (
    mime.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(ext)
  ) {
    type = "image";
    category = "photo";
  } else if (
    mime.startsWith("video/") ||
    ["mp4", "webm", "mov", "avi", "mkv"].includes(ext)
  ) {
    type = "video";
    category = "video";
  } else if (
    mime.startsWith("audio/") ||
    ["mp3", "wav", "ogg", "m4a", "aac"].includes(ext)
  ) {
    type = "audio";
    category = "file";
  } else if (ext === "pdf") {
    type = "pdf";
    category = "file";
  } else if (["doc", "docx"].includes(ext)) {
    type = "doc";
    category = "file";
  } else if (["xls", "xlsx"].includes(ext)) {
    type = "sheet";
    category = "file";
  } else if (["ppt", "pptx"].includes(ext)) {
    type = "slides";
    category = "file";
  } else if (["txt", "csv", "md", "rtf"].includes(ext)) {
    type = "text";
    category = "file";
  } else if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) {
    type = "archive";
    category = "file";
  } else if (
    ["json", "xml", "js", "html", "css", "py", "java", "c", "cpp", "rb", "php", "sh"].includes(ext)
  ) {
    type = "code";
    category = "file";
  }

  return {
    id: file.id,
    name: file.name.replace(/^\d+-/, ""),
    size: file.size,
    type,
    category,
    sender: file.uploadedBy || "",
    uploadedDate: file.createdAt,
    url: file.url,
  };
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "typing" | "offline";
  lastSeen?: string;
}

interface Message {
  id: string;
  sender: string;
  senderColor?: string;
  avatar: string;
  time: string;
  text?: string;
  isSelf?: boolean;
  file?: FileItem;
}

export const BusinessEnglishHub: React.FC<BusinessEnglishHubProps> = ({
  groupId,
  groupData,
}) => {
  const numericGroupId = groupId;

  // --- States ---
  const [inputMessage, setInputMessage] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [sharedFiles, setSharedFiles] = useState<FileItem[]>([]);

  const fetchSharedFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/files/list/${GROUP_ID}`
      );
      if (response.data?.success && Array.isArray(response.data.files)) {
        setSharedFiles(response.data.files.map(mapApiFileToFileItem));
      } else {
        setSharedFiles([]);
      }
    } catch {
      setSharedFiles([]);
    }
  }, []);

  useEffect(() => {
    fetchSharedFiles();
  }, [fetchSharedFiles]);

  useEffect(() => {
    if (showFileViewer) {
      fetchSharedFiles();
    }
  }, [showFileViewer, fetchSharedFiles]);

  const groupMembers = [
    { id: "1", name: "Maria Dupont", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
    { id: "2", name: "James Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    { id: "3", name: "Sara Kim", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80" },
    { id: "4", name: "John Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
  ];
  const [groupName, setGroupName] = useState(groupData.name);
  const [inviteCode, setInviteCode] = useState(groupData.code);
  const [membersCount, setMembersCount] = useState(0);

  const { messages, sendMessage, currentUserId } = useGroupChat(
    String(groupId),
  );

  useEffect(() => {
    studyGroupApi
      .getGroup(numericGroupId)
      .then(({ group }) => {
        setGroupName(group.name);
        setInviteCode(group.code);
        setMembersCount(group.membersCount);
      })
      .catch(() => undefined);
  }, [numericGroupId]);

  // --- Handlers ---
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopiedCode(true);

    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  };

  const handleFileUpload = (_files: File[], _type: "image" | "file" | "folder") => {
    fetchSharedFiles();
  };

  const handleCreatePoll = (question: string, options: string[]) => {
    console.log("Creating poll:", { question, options });
    // Handle poll creation and send to backend
    sendMessage(`[POLL] ${question}`);
  };

  return (
    <div className="w-full max-w-6xl h-[850px] mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
      {/* ---------------- GROUP HEADER ---------------- */}
      <header className="w-full px-8 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex justify-center items-center text-white shadow-md shadow-blue-500/20">
            {/* Hub Icon */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-gray-900 text-xl font-semibold leading-tight">
              {groupName}
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-mono font-medium rounded">
                #{inviteCode}
              </span>
              <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{membersCount} Members</span>
              </div>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Invite
        </button>
      </header>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* CHAT INTERFACE */}
        <section className="flex-1 flex flex-col bg-white min-w-0">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Date Separator */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                TODAY
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Dynamic Messages */}
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3.5 group">
                <img
                  src={msg.sender?.avatar || "https://via.placeholder.com/40"}
                  alt={msg.sender?.name || "Member avatar"}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100 shadow-sm"
                />
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-gray-900">
                      {msg.sender?.id === currentUserId
                        ? "You"
                        : msg.sender?.name || "Unknown"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {msg.text && (
                    <div className="text-gray-800 text-sm leading-relaxed bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-sky-600 focus-within:ring-1 focus-within:ring-sky-600 transition-all">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.repeat &&
                    !(e.nativeEvent as KeyboardEvent).isComposing
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendMessage();
                  }
                }}
                placeholder="Message B2 Business English Hub..."
                rows={2}
                className="w-full bg-transparent p-2 text-gray-800 placeholder-gray-400 text-sm focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center px-2 pt-1">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setShowCreatePoll(true)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                    title="Create Poll"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setShowFileUpload(true)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                    title="Upload Files"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all flex items-center gap-2"
                >
                  Send
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- RIGHT SIDEBAR ---------------- */}
        <aside className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto gap-6 p-6">
          <MemberAssignmentWidgets groupId={numericGroupId} />
          {/* Invite Code Section */}
          <div className="border-slate-200 flex flex-col gap-3">
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              INVITE INFO
            </h3>
            <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col gap-2 shadow-sm">
              <span className="text-gray-600 text-xs font-medium">
                Share this code with your classmates
              </span>
              <div className="flex justify-between items-center">
                <span className="text-sky-700 text-xl font-mono font-bold">
                  {inviteCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 text-sky-700 hover:bg-sky-50 rounded-lg transition-colors relative"
                  title="Copy code"
                >
                  {copiedCode ? (
                    <span className="text-xs text-emerald-600 font-sans font-medium">
                      Copied!
                    </span>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Shared Resources */}
          <div className="border-slate-200 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                SHARED RESOURCES
              </h3>
              <span className="text-xs text-gray-400">
                {sharedFiles.length} {sharedFiles.length === 1 ? "File" : "Files"}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {sharedFiles.length === 0 ? (
                <p className="text-gray-400 text-xs py-2">No files shared yet</p>
              ) : (
                sharedFiles.slice(0, 5).map((file) => (
                  <div
                    key={file.id}
                    onClick={() => file.url && window.open(file.url, "_blank")}
                    className="p-2 rounded-lg hover:bg-slate-200/50 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <div className="text-sky-700">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm font-semibold truncate">
                        {file.name}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => setShowFileViewer(true)}
              className="w-full py-2 border border-sky-700/20 text-sky-700 hover:bg-sky-50 font-medium text-sm rounded-lg transition-colors">
              View All Files
            </button>
          </div>

          {/* Members List */}
          <div className="p-6 flex flex-col gap-4">
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              MEMBERS (8)
            </h3>

            <div className="flex flex-col gap-3">
              {/* Member Item 1 */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Maria Dupont"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-50" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">
                    Maria Dupont
                  </p>
                  <p className="text-emerald-700 text-xs font-medium">Online</p>
                </div>
              </div>

              {/* Member Item 2 */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="James Lee"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-50" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">
                    James Lee
                  </p>
                  <p className="text-emerald-700 text-xs font-medium animate-pulse">
                    Typing...
                  </p>
                </div>
              </div>

              {/* Member Item 3 */}
              <div className="flex items-center gap-3 opacity-70">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80"
                    alt="Sara Kim"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-slate-50" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">
                    Sara Kim
                  </p>
                  <p className="text-gray-500 text-xs">Last seen 2h ago</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAllMembers(!showAllMembers)}
              className="text-sky-700 hover:text-sky-800 text-xs font-bold flex items-center gap-1.5 pt-1"
            >
              <span>{showAllMembers ? "Show less" : "Show 5 more"}</span>
              <svg
                className={`w-3 h-3 transition-transform ${showAllMembers ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </aside>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onUpload={handleFileUpload}
        groupId={GROUP_ID}
      />

      {/* Create Poll Modal */}
      <CreatePollModal
        isOpen={showCreatePoll}
        onClose={() => setShowCreatePoll(false)}
        onCreatePoll={handleCreatePoll}
      />

      {/* File Viewer Modal */}
      <FileViewerModal
        isOpen={showFileViewer}
        onClose={() => setShowFileViewer(false)}
        files={sharedFiles}
        members={groupMembers}
      />
    </div>
  );
};

export default BusinessEnglishHub;
