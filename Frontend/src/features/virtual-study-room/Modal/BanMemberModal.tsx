import React, { useState } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface BanMemberPayload {
  reason: string;
  deleteHistory: boolean;
}

interface BanMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberAvatar?: string;
  onConfirmBan: (payload: BanMemberPayload) => void;
}

// ==========================================
// SVG ICONS
// ==========================================
const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const BanIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C10.9 18 11.7667 17.8542 12.6 17.5625C13.4333 17.2708 14.2 16.85 14.9 16.3L3.7 5.1C3.15 5.8 2.72917 6.56667 2.4375 7.4C2.14583 8.23333 2 9.1 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18ZM16.3 14.9C16.85 14.2 17.2708 13.4333 17.5625 12.6C17.8542 11.7667 18 10.9 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C9.1 2 8.23333 2.14583 7.4 2.4375C6.56667 2.72917 5.8 3.15 5.1 3.7L16.3 14.9Z"
      fill="white"
    />
  </svg>
);

const ShieldExclamationIcon = () => (
  <svg
    className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m0 3.75h.007v.008H12v-.008zM12 3s7.5 2.25 7.5 10.5c0 5.25-7.5 7.5-7.5 7.5S4.5 18.75 4.5 13.5C4.5 5.25 12 3 12 3z"
    />
  </svg>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export const BanMemberModal: React.FC<BanMemberModalProps> = ({
  isOpen,
  onClose,
  memberName,
  memberAvatar,
  onConfirmBan,
}) => {
  const [reason, setReason] = useState<string>(
    "Spam or inappropriate behavior",
  );
  const [deleteHistory, setDeleteHistory] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleBan = () => {
    onConfirmBan({ reason, deleteHistory });
    onClose();
  };

  const banReasons = [
    "Spam or inappropriate behavior",
    "Harassment or hate speech",
    "Violating group rules multiple times",
    "Other reason",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 transition-opacity">
      {/* Background Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-['Inter',sans-serif] z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BanIcon />
            <h3 className="text-base font-bold text-gray-900">Ban Member</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-slate-200/60 transition"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Target User Info Summary */}
          <div className="flex items-center gap-3.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
            {memberAvatar ? (
              <img
                src={memberAvatar}
                alt={memberName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-sm">
                {memberName.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">
                Banning member:
              </span>
              <span className="text-sm font-bold text-gray-900">
                {memberName}
              </span>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-700">
              Reason for ban
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
            >
              {banReasons.map((r, idx) => (
                <option key={idx} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Options (Checkbox) */}
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="deleteHistory"
              checked={deleteHistory}
              onChange={(e) => setDeleteHistory(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
            <label
              htmlFor="deleteHistory"
              className="text-xs font-medium text-gray-700 cursor-pointer select-none"
            >
              Delete all recent messages and activity from this user
            </label>
          </div>

          {/* Permanent Action Warning */}
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <ShieldExclamationIcon />
            <div className="text-xs text-red-900 leading-relaxed">
              <span className="font-bold">Permanent Restriction:</span>{" "}
              <strong>{memberName}</strong> will be immediately removed and
              blocked from re-joining this group until manually unbanned by a
              Leader.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-gray-700 text-xs font-semibold rounded-xl transition shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleBan}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition shadow-md"
          >
            Ban Member
          </button>
        </footer>
      </div>
    </div>
  );
};

export default BanMemberModal;
