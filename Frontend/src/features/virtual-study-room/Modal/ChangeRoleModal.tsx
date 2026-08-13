import React, { useState, useEffect } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export type RoleType = "MEMBER" | "LEADER";

interface ChangeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberAvatar?: string;
  currentRole?: RoleType;
  onConfirmRole: (newRole: RoleType) => void;
}

// ==========================================
// SVG ICONS
// ==========================================
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
  </svg>
);

const CrownIcon = () => (
  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

// ==========================================
// MAIN POPUP COMPONENT
// ==========================================
export const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  isOpen,
  onClose,
  memberName,
  memberAvatar,
  currentRole = "MEMBER",
  onConfirmRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(currentRole);

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole, isOpen]);

  if (!isOpen) return null;

  const rolesList = [
    {
      id: "MEMBER" as RoleType,
      title: "Member",
      description: "Can join discussions, view materials, and complete assigned tasks.",
      icon: <UserIcon />,
      badgeColor: "bg-gray-100 text-gray-700",
    },
    {
      id: "LEADER" as RoleType,
      title: "Transfer Group Leader",
      description: "Has full control to manage group members, content, permissions, and ownership.",
      icon: <CrownIcon />,
      badgeColor: "bg-amber-100 text-amber-800",
    },
  ];

  const handleSave = () => {
    onConfirmRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 transition-opacity">
      {/* Background Click overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-['Inter',sans-serif] z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-base font-bold text-gray-900">Change Member Role</h3>
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
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                {memberName.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Changing role:</span>
              <span className="text-sm font-bold text-gray-900">{memberName}</span>
            </div>
          </div>

          {/* Role Options */}
          <div className="flex flex-col gap-3">
            {rolesList.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? "border-sky-600 bg-sky-50/40 ring-2 ring-sky-600/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="mt-0.5">{role.icon}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900">{role.title}</h4>
                      {role.id === currentRole && (
                        <span className="px-2 py-0.5 bg-slate-200 text-gray-700 text-[10px] font-bold rounded uppercase">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Radio indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected ? "border-sky-600 bg-sky-600" : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning Message when switching Leader */}
          {selectedRole === "LEADER" && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangleIcon />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Transfer Warning:</span> You are about to grant the <strong>Group Leader</strong> role to <strong>{memberName}</strong>. You will no longer have ultimate control over this group.
              </div>
            </div>
          )}
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
            onClick={handleSave}
            className={`px-5 py-2 text-white text-xs font-semibold rounded-xl transition shadow-md flex items-center gap-1.5 ${
              selectedRole === "LEADER"
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-sky-700 hover:bg-sky-800"
            }`}
          >
            {selectedRole === "LEADER" ? "Confirm Transfer" : "Save changes"}
          </button>
        </footer>

      </div>
    </div>
  );
};

export default ChangeRoleModal;