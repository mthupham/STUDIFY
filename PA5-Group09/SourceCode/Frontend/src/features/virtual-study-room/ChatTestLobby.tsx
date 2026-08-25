import React, { useState } from "react";
import { useGroupChat } from "./hooks/useGroupChat";

export default function ChatTestLobby() {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);

  if (!joinedRoom) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Chat Test Lobby</h2>
        <p className="text-sm text-gray-500 mb-4">
          Nhập mã phòng bất kỳ — cả 2 máy dùng cùng 1 mã sẽ vào chung 1 phòng chat.
        </p>
        <input
          value={roomCodeInput}
          onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && roomCodeInput.trim() && setJoinedRoom(roomCodeInput.trim())}
          placeholder="Ví dụ: PDBCWG hoặc TEST123"
          className="w-full border border-slate-300 rounded-xl p-3 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-sky-600"
        />
        <button
          onClick={() => roomCodeInput.trim() && setJoinedRoom(roomCodeInput.trim())}
          disabled={!roomCodeInput.trim()}
          className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition"
        >
          Vào phòng chat
        </button>
      </div>
    );
  }

  return <ChatTestRoom roomCode={joinedRoom} onLeave={() => setJoinedRoom(null)} />;
}

function ChatTestRoom({ roomCode, onLeave }: { roomCode: string; onLeave: () => void }) {
  const [inputMessage, setInputMessage] = useState("");
  const { messages, sendMessage, connected, currentUserId } = useGroupChat(roomCode);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 h-[600px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      <header className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div>
          <p className="text-sm font-bold text-gray-900">Room: {roomCode}</p>
          <p className="text-xs text-gray-500">{connected ? "🟢 Connected" : "🔴 Disconnected"}</p>
        </div>
        <button onClick={onLeave} className="text-xs text-red-600 hover:underline">
          Rời phòng
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-900">
                {msg.sender?.id === currentUserId ? "You" : msg.sender?.name || `User #${msg.senderId}`}
              </span>
              <span className="text-[10px] text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="text-sm bg-slate-50 border border-slate-100 rounded-xl rounded-tl-none p-2.5 max-w-[80%]">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 flex gap-2">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-600"
        />
        <button
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className="px-4 py-2 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}