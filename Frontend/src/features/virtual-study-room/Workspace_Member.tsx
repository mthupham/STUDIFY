import React, { useState } from "react";

// --- Types ---
interface FileItem {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "doc" | "folder";
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

export const BusinessEnglishHub: React.FC = () => {
  // --- States ---
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Maria Dupont",
      senderColor: "text-sky-700",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      time: "10:24 AM",
      text: "Good morning everyone! I've just uploaded the prep material for our meeting simulation tomorrow. Please take a look at the negotiation phrases.",
    },
    {
      id: "2",
      sender: "Maria Dupont",
      senderColor: "text-sky-700",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      time: "10:25 AM",
      file: {
        id: "f1",
        name: "Business Vocabulary.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
    },
    {
      id: "3",
      sender: "James Lee",
      senderColor: "text-emerald-800",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      time: "10:42 AM",
      text: "Thanks Maria! This is exactly what I needed for my presentation next week. Should we meet 15 minutes early to go over the roles?",
    },
    {
      id: "4",
      sender: "Alex Rivera (You)",
      senderColor: "text-blue-600",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      time: "11:05 AM",
      text: "I'm in! Let's do it.",
      isSelf: true,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);

  const inviteCode = "LP-B2-99";

  // --- Handlers ---
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Alex Rivera (You)",
      senderColor: "text-blue-600",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputMessage,
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl h-[850px] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden font-sans">
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
              B2 Business English Hub
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-mono font-medium rounded">
                #{inviteCode}
              </span>
              <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>8 / 10 Members</span>
              </div>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite
        </button>
      </header>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* CHAT INTERFACE */}
        <section className="flex-1 flex flex-col bg-white">
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
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100 shadow-sm"
                />
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-semibold text-sm ${msg.senderColor || "text-gray-900"}`}>
                      {msg.sender}
                    </span>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>

                  {msg.text && (
                    <div className="text-gray-800 text-sm leading-relaxed bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                      {msg.text}
                    </div>
                  )}

                  {/* File Attachment Card */}
                  {msg.file && (
                    <div className="w-72 p-3.5 bg-white rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm hover:border-slate-300 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-medium truncate">
                          {msg.file.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {msg.file.size} • PDF Document
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
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
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Message B2 Business English Hub..."
                rows={2}
                className="w-full bg-transparent p-2 text-gray-800 placeholder-gray-400 text-sm focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center px-2 pt-1">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-200/60 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all flex items-center gap-2"
                >
                  Send
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- RIGHT SIDEBAR ---------------- */}
        <aside className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          {/* Invite Code Section */}
          <div className="p-6 border-b border-slate-200 flex flex-col gap-3">
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
                    <span className="text-xs text-emerald-600 font-sans font-medium">Copied!</span>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Shared Resources */}
          <div className="p-6 border-b border-slate-200 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                SHARED RESOURCES
              </h3>
              <span className="text-xs text-gray-400">3 Files</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-2 rounded-lg hover:bg-slate-200/50 flex items-center gap-3 cursor-pointer transition-colors">
                <div className="text-red-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-semibold truncate">Business Vocabulary.pdf</p>
                  <p className="text-gray-500 text-xs">2.4 MB</p>
                </div>
              </div>

              <div className="p-2 rounded-lg hover:bg-slate-200/50 flex items-center gap-3 cursor-pointer transition-colors">
                <div className="text-sky-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-semibold truncate">Weekly Case Study.docx</p>
                  <p className="text-gray-500 text-xs">1.1 MB</p>
                </div>
              </div>

              <div className="p-2 rounded-lg hover:bg-slate-200/50 flex items-center gap-3 cursor-pointer transition-colors">
                <div className="text-amber-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-semibold truncate">Reference Images</p>
                  <p className="text-gray-500 text-xs">12 items</p>
                </div>
              </div>
            </div>

            <button className="w-full py-2 border border-sky-700/20 text-sky-700 hover:bg-sky-50 font-medium text-sm rounded-lg transition-colors">
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
                  <p className="text-gray-900 text-sm font-semibold">Maria Dupont</p>
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
                  <p className="text-gray-900 text-sm font-semibold">James Lee</p>
                  <p className="text-emerald-700 text-xs font-medium animate-pulse">Typing...</p>
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
                  <p className="text-gray-900 text-sm font-semibold">Sara Kim</p>
                  <p className="text-gray-500 text-xs">Last seen 2h ago</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAllMembers(!showAllMembers)}
              className="text-sky-700 hover:text-sky-800 text-xs font-bold flex items-center gap-1.5 pt-1"
            >
              <span>{showAllMembers ? "Show less" : "Show 5 more"}</span>
              <svg className={`w-3 h-3 transition-transform ${showAllMembers ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BusinessEnglishHub;