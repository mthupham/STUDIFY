import React, { useState } from "react";
import { useAuthStore } from "../auth/store/useAuthStore";
import { NavLink } from "react-router-dom";

const userData = {
  username: "User",
  email: "user@gmail.com",
  language: "Tiếng Việt (Vietnam)",
  level: "B2 LEVEL",
  progress: 90, // %
};

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* --- PROFILE HEADER SECTION --- */}
      <header className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-start lg:p-10">
        {/* Avatar */}
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-[#0058BE] shadow-md sm:h-32 sm:w-32 lg:h-40 lg:w-40">
          {/* Nếu có ảnh: <img src="..." alt={userData.username} className="w-full h-full object-cover" /> */}
        </div>

        {/* User Info */}
        <div className="flex flex-1 flex-col gap-4 pt-2">
          <h1 className="text-3xl font-bold text-[#131B2E] font-inter">
            {userData.username}
          </h1>

          <button className="w-full rounded-lg bg-[#004AC6] px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#003da4] sm:w-max">
            Edit Profile
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA (Bento Grid) --- */}
      <main className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: General Settings & Change Password (Chiếm 2 phần) */}
        <section className="flex flex-col gap-8 rounded-xl bg-white p-6 shadow-sm sm:p-8 md:col-span-2">
          {/* --- Part 1: General Settings --- */}
          <div className="flex flex-col gap-6">
            <div className="pb-4 border-b border-[#C3C6D7] flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M3.85 15.1C4.7 14.45 5.65 13.9375 6.7 13.5625C7.75 13.1875 8.85 13 10 13C11.15 13 12.25 13.1875 13.3 13.5625C14.35 13.9375 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1875 13.6417 17.5125 12.775C17.8375 11.9083 18 10.9833 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 10.9833 2.1625 11.9083 2.4875 12.775C2.8125 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.1875 10.6625 7.5125 9.9875C6.8375 9.3125 6.5 8.48333 6.5 7.5C6.5 6.51667 6.8375 5.6875 7.5125 5.0125C8.1875 4.3375 9.01667 4 10 4C10.9833 4 11.8125 4.3375 12.4875 5.0125C13.1625 5.6875 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1625 9.3125 12.4875 9.9875C11.8125 10.6625 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C10.8833 18 11.7167 17.8708 12.5 17.6125C13.2833 17.3542 14 16.9833 14.65 16.5C14 16.0167 13.2833 15.6458 12.5 15.3875C11.7167 15.1292 10.8833 15 10 15C9.11667 15 8.28333 15.1292 7.5 15.3875C6.71667 15.6458 6 16.0167 5.35 16.5C6 16.9833 6.71667 17.3542 7.5 17.6125C8.28333 17.8708 9.11667 18 10 18ZM10 9C10.4333 9 10.7917 8.85833 11.075 8.575C11.3583 8.29167 11.5 7.93333 11.5 7.5C11.5 7.06667 11.3583 6.70833 11.075 6.425C10.7917 6.14167 10.4333 6 10 6C9.56667 6 9.20833 6.14167 8.925 6.425C8.64167 6.70833 8.5 7.06667 8.5 7.5C8.5 7.93333 8.64167 8.29167 8.925 8.575C9.20833 8.85833 9.56667 9 10 9Z"
                  fill="#004AC6"
                />
              </svg>
              <h2 className="text-xl font-semibold text-[#131B2E]">
                General Settings
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#434655]">
                  Email Address
                </label>
                <div className="w-full px-4 py-3 bg-[#F2F3FF] border border-[#C3C6D7] rounded-lg text-[#131B2E]">
                  {userData.email}
                </div>
              </div>

              {/* Language Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#434655]">
                  Interface Language
                </label>
                <div className="w-full px-4 py-3 bg-[#F2F3FF] border border-[#C3C6D7] rounded-lg flex items-center gap-3 text-[#131B2E]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M8.34375 16.6667C7.19792 16.6667 6.11806 16.4479 5.10417 16.0104C4.09028 15.5729 3.20486 14.9757 2.44792 14.2188C1.69097 13.4618 1.09375 12.5764 0.65625 11.5625C0.21875 10.5486 0 9.46875 0 8.32292C0 7.17708 0.21875 6.10069 0.65625 5.09375C1.09375 4.08681 1.69097 3.20486 2.44792 2.44792C3.20486 1.69097 4.09028 1.09375 5.10417 0.65625C6.11806 0.21875 7.19792 0 8.34375 0C9.48958 0 10.566 0.21875 11.5729 0.65625C12.5799 1.09375 13.4618 1.69097 14.2188 2.44792C14.9757 3.20486 15.5729 4.08681 16.0104 5.09375C16.4479 6.10069 16.6667 7.17708 16.6667 8.32292C16.6667 9.46875 16.4479 10.5486 16.0104 11.5625C15.5729 12.5764 14.9757 13.4618 14.2188 14.2188C13.4618 14.9757 12.5799 15.5729 11.5729 16.0104C10.566 16.4479 9.48958 16.6667 8.34375 16.6667ZM8.33333 14.9583C8.69444 14.4583 9.00694 13.9375 9.27083 13.3958C9.53472 12.8542 9.75 12.2778 9.91667 11.6667H6.75C6.91667 12.2778 7.13194 12.8542 7.39583 13.3958C7.65972 13.9375 7.97222 14.4583 8.33333 14.9583ZM6.16667 14.625C5.91667 14.1667 5.69792 13.691 5.51042 13.1979C5.32292 12.7049 5.16667 12.1944 5.04167 11.6667H2.58333C2.98611 12.3611 3.48958 12.9653 4.09375 13.4792C4.69792 13.9931 5.38889 14.375 6.16667 14.625ZM10.5 14.625C11.2778 14.375 11.9688 13.9931 12.5729 13.4792C13.1771 12.9653 13.6806 12.3611 14.0833 11.6667H11.625C11.5 12.1944 11.3438 12.7049 11.1562 13.1979C10.9688 13.691 10.75 14.1667 10.5 14.625ZM1.875 10H4.70833C4.66667 9.72222 4.63542 9.44792 4.61458 9.17708C4.59375 8.90625 4.58333 8.625 4.58333 8.33333C4.58333 8.04167 4.59375 7.76042 4.61458 7.48958C4.63542 7.21875 4.66667 6.94444 4.70833 6.66667H1.875C1.80556 6.94444 1.75347 7.21875 1.71875 7.48958C1.68403 7.76042 1.66667 8.04167 1.66667 8.33333C1.66667 8.625 1.68403 8.90625 1.71875 9.17708C1.75347 9.44792 1.80556 9.72222 1.875 10ZM6.375 10H10.2917C10.3333 9.72222 10.3646 9.44792 10.3854 9.17708C10.4062 8.90625 10.4167 8.625 10.4167 8.33333C10.4167 8.04167 10.4062 7.76042 10.3854 7.48958C10.3646 7.21875 10.3333 6.94444 10.2917 6.66667H6.375C6.33333 6.94444 6.30208 7.21875 6.28125 7.48958C6.26042 7.76042 6.25 8.04167 6.25 8.33333C6.25 8.625 6.26042 8.90625 6.28125 9.17708C6.30208 9.44792 6.33333 9.72222 6.375 10ZM11.9583 10H14.7917C14.8611 9.72222 14.9132 9.44792 14.9479 9.17708C14.9826 8.90625 15 8.625 15 8.33333C15 8.04167 14.9826 7.76042 14.9479 7.48958C14.9132 7.21875 14.8611 6.94444 14.7917 6.66667H11.9583C12 6.94444 12.0312 7.21875 12.0521 7.48958C12.0729 7.76042 12.0833 8.04167 12.0833 8.33333C12.0833 8.625 12.0729 8.90625 12.0521 9.17708C12.0312 9.44792 12 9.72222 11.9583 10ZM11.625 5H14.0833C13.6806 4.30556 13.1771 3.70139 12.5729 3.1875C11.9688 2.67361 11.2778 2.29167 10.5 2.04167C10.75 2.5 10.9688 2.97569 11.1562 3.46875C11.3438 3.96181 11.5 4.47222 11.625 5ZM6.75 5H9.91667C9.75 4.38889 9.53472 3.8125 9.27083 3.27083C9.00694 2.72917 8.69444 2.20833 8.33333 1.70833C7.97222 2.20833 7.65972 2.72917 7.39583 3.27083C7.13194 3.8125 6.91667 4.38889 6.75 5ZM2.58333 5H5.04167C5.16667 4.47222 5.32292 3.96181 5.51042 3.46875C5.69792 2.97569 5.91667 2.5 6.16667 2.04167C5.38889 2.29167 4.69792 2.67361 4.09375 3.1875C3.48958 3.70139 2.98611 4.30556 2.58333 5Z"
                      fill="#434655"
                    />
                  </svg>
                  <span className="leading-none">{userData.language}</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Part 2: Change Password Section --- */}
          <div className="pt-6 border-t border-gray-200 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#004AC6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <h2 className="text-xl font-semibold text-[#131B2E]">
                Change Password
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#434655]">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-[#C3C6D7] rounded-lg text-[#131B2E] focus:outline-none focus:border-[#004AC6] focus:ring-1 focus:ring-[#004AC6]"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#434655]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-[#C3C6D7] rounded-lg text-[#131B2E] focus:outline-none focus:border-[#004AC6] focus:ring-1 focus:ring-[#004AC6]"
                />
              </div>
            </div>

            <button className="w-full rounded-lg bg-[#004AC6] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#003da4] sm:w-max sm:self-end">
              Update Password
            </button>
          </div>
        </section>

        {/* Right Column: Learning Progress (Chiếm 1 phần) */}
        <aside className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Level info */}
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-[#131B2E]">
                Your current level:
              </span>
              <span className="font-bold text-[#0058BE]">{userData.level}</span>
            </div>

            {/* Progress info */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-[#131B2E]">Complete:</span>
                <span className="font-medium text-[#004AC6]">
                  {userData.progress}%
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#EAEDFF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#004AC6] rounded-full transition-all duration-300"
                  style={{ width: `${userData.progress}%` }}
                />
              </div>
            </div>
          </div>
          <NavLink to="/lessons" style={{ textDecoration: "none" }}>
            <button className="w-full rounded-lg border border-[#C3C6D7] py-3 text-sm font-medium text-[#434655] transition-colors hover:bg-gray-50">
              Let's keep going!
            </button>
          </NavLink>
        </aside>
      </main>
    </div>
  );
}
