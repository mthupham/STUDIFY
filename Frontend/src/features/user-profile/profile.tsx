import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../auth/store/useAuthStore";
import { NavLink } from "react-router-dom";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuthSession = useAuthStore((state) => state.setAuthSession);

  const profileName = user?.name || "User";
  const profileInitial = profileName.trim().charAt(0).toUpperCase() || "?";
  const profileEmail = user?.email || "user@gmail.com";

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(profileName);
  const [email, setEmail] = useState<string>(profileEmail);
  const [level, setLevel] = useState<string>(user?.currentLevel || "A1");
  const [progress, setProgress] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

  const loadRoadmap = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${apiBaseUrl}/roadmap`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        const currentLvl = data.assignedLevel || "A1";
        setLevel(currentLvl);

        if (data.metrics?.lessons) {
          const [completed, total] = data.metrics.lessons.split("/").map(Number);
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          setProgress(percent);
        }
      }
    } catch (err) {
      console.error("Failed to load user level & progress from roadmap:", err);
    }
  };

  useEffect(() => {
    setName(profileName);
    setEmail(profileEmail);
    setLevel(user?.currentLevel || "A1");
  }, [profileName, profileEmail, user?.currentLevel]);

  useEffect(() => {
    void loadRoadmap();
  }, [token]);

  const handleSaveProfile = async () => {
    if (!token) {
      setError("Session expired. Please sign in again.");
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      // 1. Update Profile (Name & Email)
      const { data } = await axios.patch(
        `${apiBaseUrl}/user/profile`,
        {
          name: name.trim(),
          email: email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let updatedUser = data?.data || user;

      // 2. Update Level if it has changed
      if (level !== user?.currentLevel) {
        const { data: levelData } = await axios.patch(
          `${apiBaseUrl}/user/select-level`,
          { level },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (levelData?.data) {
          updatedUser = levelData.data;
        }
      }

      setAuthSession(updatedUser, token);
      setMessage("Profile updated successfully.");
      setIsEditing(false);
      void loadRoadmap();
    } catch (err) {
      const apiMessage = axios.isAxiosError(err) ? err.response?.data?.message : null;
      setError(
        Array.isArray(apiMessage)
          ? apiMessage.join(", ")
          : apiMessage || "Unable to update profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans text-slate-800 antialiased">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* --- PROFILE HEADER SECTION --- */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:text-left">
              {/* Avatar */}
              <div
                className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-4xl font-extrabold text-white shadow-lg shadow-blue-500/20 ring-4 ring-white"
                aria-label={`Avatar of ${profileName}`}
              >
                <span className="select-none">{profileInitial}</span>
              </div>

              {/* User Info */}
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {profileName}
                </h1>
                <p className="text-sm font-medium text-slate-500">{profileEmail}</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Learner • {level} LEVEL
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={() => {
                    setName(profileName);
                    setEmail(profileEmail);
                    setLevel(user?.currentLevel || "A1");
                    setError("");
                    setMessage("");
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60 transition-all"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setError("");
                      setMessage("");
                      setName(profileName);
                      setEmail(profileEmail);
                      setLevel(user?.currentLevel || "A1");
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Alert Messages */}
          {(message || error) && (
            <div className="mt-6">
              {message && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm font-medium text-emerald-800">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm font-medium text-rose-800">
                  {error}
                </div>
              )}
            </div>
          )}
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column: General Settings */}
          <section className="md:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">General Settings</h2>
                <p className="text-xs text-slate-500">Manage your personal details and account info</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="w-full rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-800">
                    {profileName}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="w-full rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-800">
                    {profileEmail}
                  </div>
                )}
              </div>

              {/* Level Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Current Level
                </label>
                {isEditing ? (
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 bg-white"
                  >
                    <option value="A1">A1 - Beginner</option>
                    <option value="A2">A2 - Elementary</option>
                    <option value="B1">B1 - Intermediate</option>
                    <option value="B2">B2 - Upper Intermediate</option>
                    <option value="C1">C1 - Advanced</option>
                    <option value="C2">C2 - Proficient</option>
                  </select>
                ) : (
                  <div className="w-full rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-800">
                    {level} LEVEL
                  </div>
                )}
              </div>

              {/* Language Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Interface Language
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>English</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Learning Progress */}
          <aside className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Learning Progress</h2>
                  <p className="text-xs text-slate-500">Your current study status</p>
                </div>
              </div>

              {/* Level & Progress Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-600">Current Level</span>
                  <span className="font-extrabold text-blue-600">{level} LEVEL</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Overall Completion</span>
                    <span className="text-blue-600">{progress}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <NavLink to="/lessons" className="block text-decoration-none">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.99]">
                <span>Let's keep going!</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </NavLink>
          </aside>
        </main>
      </div>
    </div>
  );
}