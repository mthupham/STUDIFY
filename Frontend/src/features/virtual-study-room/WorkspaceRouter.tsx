import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/useAuthStore";
import { getGroupDetails } from "./services/groupService";
import type { GroupDetail } from "./services/groupService";
import { GroupDashboard } from "./Workspace_Leader";
import { BusinessEnglishHub } from "./Workspace_Member";

// ─── Loading State ──────────────────────────────────────────────────────────

function WorkspaceLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4 text-gray-500">
        <svg
          className="w-10 h-10 animate-spin text-sky-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="text-sm font-medium">Loading workspace...</p>
      </div>
    </div>
  );
}

// ─── Error State ────────────────────────────────────────────────────────────

function WorkspaceError({ message }: { message: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-7 h-7 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Cannot load workspace
          </h3>
          <p className="text-sm text-gray-500 mt-1">{message}</p>
        </div>
        <button
          onClick={() => navigate("/study-groups")}
          className="px-5 py-2 bg-sky-700 text-white text-sm font-semibold rounded-xl hover:bg-sky-800 transition"
        >
          Back to Groups
        </button>
      </div>
    </div>
  );
}

// ─── Main Router ────────────────────────────────────────────────────────────

export default function WorkspaceRouter() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const numericGroupId = Number(groupId);

  const fetchGroupDetail = () => {
    if (!token || !numericGroupId) return;
    setLoading(true);
    setError(null);

    getGroupDetails(token, numericGroupId)
      .then((data) => {
        setGroupDetail(data);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ||
          "Failed to load group. You may not be a member.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!numericGroupId || isNaN(numericGroupId)) {
      setError("Invalid group ID.");
      setLoading(false);
      return;
    }
    fetchGroupDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, numericGroupId]);

  if (loading) return <WorkspaceLoading />;
  if (error) return <WorkspaceError message={error} />;
  if (!groupDetail) return <WorkspaceError message="Group data not found." />;

  const { group, currentUserRole } = groupDetail;

  return currentUserRole === "LEADER" ? (
    <GroupDashboard
      groupId={numericGroupId}
      groupData={group}
      onGroupUpdated={fetchGroupDetail}
    />
  ) : (
    <BusinessEnglishHub
      groupId={numericGroupId}
      groupData={group}
    />
  );
}
