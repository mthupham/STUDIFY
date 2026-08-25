import React from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberAvatar?: string;
  onConfirmRemove: () => void;
}

// ==========================================
// SVG ICONS
// ==========================================
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserMinusIcon = () => (
  <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export const RemoveMemberModal: React.FC<RemoveMemberModalProps> = ({
  isOpen,
  onClose,
  memberName,
  memberAvatar,
  onConfirmRemove,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirmRemove();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 transition-opacity">
      {/* Background Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-['Inter',sans-serif] z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <UserMinusIcon />
            <h3 className="text-base font-bold text-gray-900">Remove Member</h3>
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
          {/* Member Summary */}
          <div className="flex items-center gap-3.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
            {memberAvatar ? (
              <img
                src={memberAvatar}
                alt={memberName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-sm">
                {memberName.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Removing member:</span>
              <span className="text-sm font-bold text-gray-900">{memberName}</span>
            </div>
          </div>

          {/* Description Text */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to remove <strong>{memberName}</strong> from this group? They will lose access to all shared resources, discussions, and group tasks immediately.
          </p>

          {/* Warning Message */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
            <AlertTriangleIcon />
            <div className="text-xs text-rose-900 leading-relaxed">
              <span className="font-bold">Note:</span> The member can still be re-invited to the group later by any Leader or Moderator.
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
            onClick={handleConfirm}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition shadow-md"
          >
            Remove Member
          </button>
        </footer>

      </div>
    </div>
  );
};

export default RemoveMemberModal;