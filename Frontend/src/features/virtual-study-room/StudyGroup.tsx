import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApiErrorMessage,
  studyGroupApi,
  type StudyGroupSummary,
} from "./services/studyGroupApi";

// ==========================================
// COMPONENT CHÍNH
// ==========================================

export default function StudyGroupHub() {
  const [groups, setGroups] = useState<StudyGroupSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    studyGroupApi
      .getMyGroups()
      .then((items) => {
        if (!cancelled) setGroups(items);
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(getApiErrorMessage(requestError, "Unable to load your study groups."));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Listen for external group updates (e.g., icon changed) and refresh list
    const onGroupUpdated = (ev: Event) => {
      try {
        const custom = ev as CustomEvent;
        if (!custom?.detail) return;
        // If groupId present we can selectively refresh; for now reload full list
        studyGroupApi
          .getMyGroups()
          .then((items) => {
            if (!cancelled) setGroups(items);
          })
          .catch(() => {});
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("study-group-updated", onGroupUpdated as EventListener);

    return () => {
      cancelled = true;
      window.removeEventListener("study-group-updated", onGroupUpdated as EventListener);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8 font-['Inter'] text-gray-900">
      <HeaderSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {loading && (
            <div className="col-span-full text-center py-10 text-gray-500">
              Loading your study groups...
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full text-center py-10 text-red-600">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
              />
            ))}

          <CreateGroupCard />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

/**
 * Header chứa tiêu đề trang và các nút hành động chính
 */
function HeaderSection() {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
      <div>
        <h1 className="!text-3xl !font-bold !text-gray-900 !tracking-tight">
          Study Group Hub
        </h1>
        <p className="text-gray-600 mt-1">
          Connect with fellow learners to accelerate your progress.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/study-groups/join-group")}
          className="px-5 py-2.5 rounded-xl border border-sky-700 text-sky-700 font-medium hover:bg-sky-50 transition flex items-center gap-2"
        >
          {/* User Plus Icon */}
          <svg
            className="w-5 h-5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Join Group
        </button>
        <button
          onClick={() => navigate("/study-groups/new-group")}
          className="px-5 py-2.5 rounded-xl bg-sky-700 text-white font-medium shadow-md hover:bg-sky-800 transition flex items-center gap-2"
        >
          {/* Plus Icon */}
          <svg
            className="w-5 h-5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Group
        </button>
      </div>
    </header>
  );
}

function getGroupIconSvg(iconId: string, className: string) {
  switch (iconId) {
    case "rocket":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 4.13H5a6 6 0 006-6v-.52M15 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    case "books":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "graduation":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "laptop":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "target":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "brain":
      return (
        <svg className={className} viewBox="0 0 29 30" fill="currentColor">
          <path d="M4.5 30V23.55C3.075 22.25 1.96875 20.7312 1.18125 18.9937C0.39375 17.2563 0 15.425 0 13.5C0 9.75 1.3125 6.5625 3.9375 3.9375C6.5625 1.3125 9.75 0 13.5 0C16.625 0 19.3937 0.91875 21.8062 2.75625C24.2188 4.59375 25.7875 6.9875 26.5125 9.9375L28.4625 17.625C28.5875 18.1 28.5 18.5312 28.2 18.9188C27.9 19.3063 27.5 19.5 27 19.5H24V24C24 24.825 23.7062 25.5312 23.1187 26.1187C22.5312 26.7062 21.825 27 21 27H18V30H15V24H21V16.5H25.05L23.625 10.6875C23.05 8.4125 21.825 6.5625 19.95 5.1375C18.075 3.7125 15.925 3 13.5 3C10.6 3 8.125 4.0125 6.075 6.0375C4.025 8.0625 3 10.525 3 13.425C3 14.925 3.30625 16.35 3.91875 17.7C4.53125 19.05 5.4 20.25 6.525 21.3L7.5 22.2V30H4.5ZM12 19.5H15L15.225 17.625C15.425 17.55 15.6062 17.4625 15.7688 17.3625C15.9313 17.2625 16.075 17.15 16.2 17.025L17.925 17.775L19.425 15.225L17.925 14.1C17.975 13.9 18 13.7 18 13.5C18 13.3 17.975 13.1 17.925 12.9L19.425 11.775L17.925 9.225L16.2 9.975C16.075 9.85 15.9313 9.7375 15.7688 9.6375C15.6062 9.5375 15.425 9.45 15.225 9.375L15 7.5H12L11.775 9.375C11.575 9.45 11.3938 9.5375 11.2312 9.6375C11.0687 9.7375 10.925 9.85 10.8 9.975L9.075 9.225L7.575 11.775L9.075 12.9C9.025 13.1 9 13.3 9 13.5C9 13.7 9.025 13.9 9.075 14.1L7.575 15.225L9.075 17.775L10.8 17.025C10.925 17.15 11.0687 17.2625 11.2312 17.3625C11.3938 17.4625 11.575 17.55 11.775 17.625L12 19.5ZM13.5 15.75C12.875 15.75 12.3438 15.5312 11.9062 15.0938C11.4688 14.6562 11.25 14.125 11.25 13.5C11.25 12.875 11.4688 12.3438 11.9062 11.9062C12.3438 11.4688 12.875 11.25 13.5 11.25C14.125 11.25 14.6562 11.4688 15.0938 11.9062C15.5312 12.3438 15.75 12.875 15.75 13.5C15.75 14.125 15.5312 14.6562 15.0938 15.0938C14.6562 15.5312 14.125 15.75 13.5 15.75Z" />
        </svg>
      );
    case "notes":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
    case "global":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case "library":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      );
    case "quiz":
      return (
        <svg className={className} viewBox="0 0 30 30" fill="currentColor">
          <path d="M18 19.5C18.425 19.5 18.7938 19.3438 19.1063 19.0312C19.4188 18.7188 19.575 18.35 19.575 17.925C19.575 17.5 19.4188 17.1313 19.1063 16.8188C18.7938 16.5063 18.425 16.35 18 16.35C17.575 16.35 17.2062 16.5063 16.8937 16.8188C16.5812 17.1313 16.425 17.5 16.425 17.925C16.425 18.35 16.5812 18.7188 16.8937 19.0312C17.2062 19.3438 17.575 19.5 18 19.5ZM16.875 14.7H19.125C19.125 13.975 19.2 13.4437 19.35 13.1062C19.5 12.7688 19.85 12.325 20.4 11.775C21.15 11.025 21.65 10.4187 21.9 9.95625C22.15 9.49375 22.275 8.95 22.275 8.325C22.275 7.2 21.8813 6.28125 21.0938 5.56875C20.3062 4.85625 19.275 4.5 18 4.5C16.975 4.5 16.0813 4.7875 15.3188 5.3625C14.5563 5.9375 14.025 6.7 13.725 7.65L15.75 8.475C15.975 7.85 16.2812 7.38125 16.6688 7.06875C17.0563 6.75625 17.5 6.6 18 6.6C18.6 6.6 19.0875 6.76875 19.4625 7.10625C19.8375 7.44375 20.025 7.9 20.025 8.475C20.025 8.825 19.925 9.15625 19.725 9.46875C19.525 9.78125 19.175 10.175 18.675 10.65C17.85 11.375 17.3438 11.9437 17.1562 12.3562C16.9688 12.7688 16.875 13.55 16.875 14.7ZM9 24C8.175 24 7.46875 23.7062 6.88125 23.1187C6.29375 22.5312 6 21.825 6 21V3C6 2.175 6.29375 1.46875 6.88125 0.88125C7.46875 0.29375 8.175 0 9 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H9ZM9 21H27V3H9V21ZM3 30C2.175 30 1.46875 29.7062 0.88125 29.1187C0.29375 28.5312 0 27.825 0 27V6H3V27H24V30H3ZM9 3V21V3Z" />
        </svg>
      );
    case "culture":
      return (
        <svg className={className} viewBox="0 0 30 30" fill="currentColor">
          <path d="M15 30C12.925 30 10.975 29.6063 9.15 28.8188C7.325 28.0312 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.96875 22.675 1.18125 20.85C0.39375 19.025 0 17.075 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.96875 9.15 1.18125C10.975 0.39375 12.925 0 15 0C17.075 0 19.025 0.39375 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0312 7.325 28.8188 9.15C29.6063 10.975 30 12.925 30 15C30 17.075 29.6063 19.025 28.8188 20.85C28.0312 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0312 20.85 28.8188C19.025 29.6063 17.075 30 15 30ZM13.5 26.925V24C12.675 24 11.9688 23.7062 11.3813 23.1187C10.7938 22.5312 10.5 21.825 10.5 21V19.5L3.3 12.3C3.225 12.75 3.15625 13.2 3.09375 13.65C3.03125 14.1 3 14.55 3 15C3 18.025 3.99375 20.675 5.98125 22.95C7.96875 25.225 10.475 26.55 13.5 26.925ZM23.85 23.1C24.875 21.975 25.6562 20.7188 26.1938 19.3312C26.7313 17.9437 27 16.5 27 15C27 12.55 26.3187 10.3125 24.9562 8.2875C23.5938 6.2625 21.775 4.8 19.5 3.9V4.5C19.5 5.325 19.2062 6.03125 18.6187 6.61875C18.0312 7.20625 17.325 7.5 16.5 7.5H13.5V10.5C13.5 10.925 13.3563 11.2812 13.0688 11.5688C12.7812 11.8563 12.425 12 12 12H9V15H18C18.425 15 18.7812 15.1437 19.0688 15.4312C19.3563 15.7188 19.5 16.075 19.5 16.5V21H21C21.65 21 22.2375 21.1937 22.7625 21.5812C23.2875 21.9688 23.65 22.475 23.85 23.1Z" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      );
  }
}

/**
 * Card hiển thị thông tin chi tiết từng nhóm học
 */
function GroupCard({ group }: { group: StudyGroupSummary }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(
          group.role === "LEADER"
            ? `/study-groups/${group.id}/workspace-leader`
            : `/study-groups/${group.id}/workspace-member`,
        )
      }
      className="
        w-full
        text-left
        p-6
        bg-slate-50
        border
        border-slate-200/80
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-sky-300
        hover:-translate-y-1
        transition-all
        flex
        flex-col
        justify-between
        gap-4
        cursor-pointer
      "
    >
      <div>
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 bg-blue-100 text-sky-700 rounded-2xl flex items-center justify-center">
            {getGroupIconSvg(group.icon, "w-7 h-7 fill-current text-sky-700")}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              group.role === "LEADER"
                ? "bg-blue-100 text-sky-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {group.role}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mt-4">
          {group.name}
        </h3>

        {group.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {group.description}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-2">
          Group code:{" "}
          <span className="font-bold text-sky-700">
            {group.code}
          </span>
        </p>
      </div>

      {/* Footer card: Danh sách thành viên + Trạng thái */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/40">
        {/* Thành viên (Avatar Stack) */}
        <div className="flex items-center -space-x-2">
          {(group.members ?? []).slice(0, 4).map((member, idx) => {
            const name = member.name || "U";
            const avatar = member.avatar;
            const initials = name.slice(0, 2).toUpperCase();
            return avatar ? (
              <img
                key={member.userId || idx}
                src={avatar}
                alt={name}
                className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover"
              />
            ) : (
              <div
                key={member.userId || idx}
                className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-gray-800"
              >
                {initials}
              </div>
            );
          })}
          {(group.members ?? []).length > 4 && (
            <div className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
              +{(group.members ?? []).length - 4}
            </div>
          )}
          {(group.members ?? []).length === 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-gray-800">
              {group.membersCount}
            </div>
          )}
        </div>

        {/* Trạng thái nhóm */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
          <StatusIcon type="active" />
          <span>{group.membersCount} member{group.membersCount === 1 ? "" : "s"}</span>
        </div>
      </div>
    </button>
  );
}

/**
 * Card dạng viền đứt nét để tạo nhóm mới
 */
function CreateGroupCard() {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/study-groups/new-group")}
    className="p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-sky-600 hover:bg-sky-50/50 transition flex flex-col items-center justify-center gap-3 text-gray-600 hover:text-sky-700 min-h-[220px]">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
        <svg
          className="w-6 h-6 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <span className="text-base font-medium">Launch a new study circle</span>
    </button>
  );
}

/**
 * Helper Component: Icon hiển thị trạng thái
 */
function StatusIcon({ type }: { type: string }) {
  if (type === "lock") {
    return (
      <svg
        className="w-3.5 h-3.5 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    );
  }
  if (type === "active") {
    return (
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    );
  }
  // Mặc định icon đồng hồ cho thời gian
  return (
    <svg
      className="w-3.5 h-3.5 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
