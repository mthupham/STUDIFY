import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ==========================================
// 1. SVG ICON COMPONENTS (Làm sạch các Icon)
// ==========================================

const ArrowLeftIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const MessageSquareIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

const BookOpenIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const GlobeIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-15.432-4.5A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253"
    />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

// Danh sách icon cho người dùng chọn
const ICON_OPTIONS = [
  { id: "chat", Component: MessageSquareIcon },
  { id: "book", Component: BookOpenIcon },
  { id: "globe", Component: GlobeIcon },
  { id: "users", Component: UsersIcon },
  { id: "sparkles", Component: SparklesIcon },
  { id: "custom", Component: PlusIcon },
];

type IconOption = {
  id: string;
  name: string;
  icon: (className: string) => React.ReactNode;
};

const ALL_ICONS: IconOption[] = [
  {
    id: "rocket",
    name: "Rocket",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 4.13H5a6 6 0 006-6v-.52M15 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
  },
  {
    id: "books",
    name: "Books",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "graduation",
    name: "Graduation",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
  },
  {
    id: "lightbulb",
    name: "Light Bulb",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: "laptop",
    name: "Laptop",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "target",
    name: "Target",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "brain",
    name: "Brain",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 29 30" fill="currentColor">
        <path d="M4.5 30V23.55C3.075 22.25 1.96875 20.7312 1.18125 18.9937C0.39375 17.2563 0 15.425 0 13.5C0 9.75 1.3125 6.5625 3.9375 3.9375C6.5625 1.3125 9.75 0 13.5 0C16.625 0 19.3937 0.91875 21.8062 2.75625C24.2188 4.59375 25.7875 6.9875 26.5125 9.9375L28.4625 17.625C28.5875 18.1 28.5 18.5312 28.2 18.9188C27.9 19.3063 27.5 19.5 27 19.5H24V24C24 24.825 23.7062 25.5312 23.1187 26.1187C22.5312 26.7062 21.825 27 21 27H18V30H15V24H21V16.5H25.05L23.625 10.6875C23.05 8.4125 21.825 6.5625 19.95 5.1375C18.075 3.7125 15.925 3 13.5 3C10.6 3 8.125 4.0125 6.075 6.0375C4.025 8.0625 3 10.525 3 13.425C3 14.925 3.30625 16.35 3.91875 17.7C4.53125 19.05 5.4 20.25 6.525 21.3L7.5 22.2V30H4.5ZM12 19.5H15L15.225 17.625C15.425 17.55 15.6062 17.4625 15.7688 17.3625C15.9313 17.2625 16.075 17.15 16.2 17.025L17.925 17.775L19.425 15.225L17.925 14.1C17.975 13.9 18 13.7 18 13.5C18 13.3 17.975 13.1 17.925 12.9L19.425 11.775L17.925 9.225L16.2 9.975C16.075 9.85 15.9313 9.7375 15.7688 9.6375C15.6062 9.5375 15.425 9.45 15.225 9.375L15 7.5H12L11.775 9.375C11.575 9.45 11.3938 9.5375 11.2312 9.6375C11.0687 9.7375 10.925 9.85 10.8 9.975L9.075 9.225L7.575 11.775L9.075 12.9C9.025 13.1 9 13.3 9 13.5C9 13.7 9.025 13.9 9.075 14.1L7.575 15.225L9.075 17.775L10.8 17.025C10.925 17.15 11.0687 17.2625 11.2312 17.3625C11.3938 17.4625 11.575 17.55 11.775 17.625L12 19.5ZM13.5 15.75C12.875 15.75 12.3438 15.5312 11.9062 15.0938C11.4688 14.6562 11.25 14.125 11.25 13.5C11.25 12.875 11.4688 12.3438 11.9062 11.9062C12.3438 11.4688 12.875 11.25 13.5 11.25C14.125 11.25 14.6562 11.4688 15.0938 11.9062C15.5312 12.3438 15.75 12.875 15.75 13.5C15.75 14.125 15.5312 14.6562 15.0938 15.0938C14.6562 15.5312 14.125 15.75 13.5 15.75Z" />
      </svg>
    ),
  },
  {
    id: "notes",
    name: "Notes",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "global",
    name: "Global",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    id: "library",
    name: "Library",
    icon: (cls) => (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
        />
      </svg>
    ),
  },
  {
    id: "quiz",
    name: "Quiz",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 30 30" fill="currentColor">
        <path d="M18 19.5C18.425 19.5 18.7938 19.3438 19.1063 19.0312C19.4188 18.7188 19.575 18.35 19.575 17.925C19.575 17.5 19.4188 17.1313 19.1063 16.8188C18.7938 16.5063 18.425 16.35 18 16.35C17.575 16.35 17.2062 16.5063 16.8937 16.8188C16.5812 17.1313 16.425 17.5 16.425 17.925C16.425 18.35 16.5812 18.7188 16.8937 19.0312C17.2062 19.3438 17.575 19.5 18 19.5ZM16.875 14.7H19.125C19.125 13.975 19.2 13.4437 19.35 13.1062C19.5 12.7688 19.85 12.325 20.4 11.775C21.15 11.025 21.65 10.4187 21.9 9.95625C22.15 9.49375 22.275 8.95 22.275 8.325C22.275 7.2 21.8813 6.28125 21.0938 5.56875C20.3062 4.85625 19.275 4.5 18 4.5C16.975 4.5 16.0813 4.7875 15.3188 5.3625C14.5563 5.9375 14.025 6.7 13.725 7.65L15.75 8.475C15.975 7.85 16.2812 7.38125 16.6688 7.06875C17.0563 6.75625 17.5 6.6 18 6.6C18.6 6.6 19.0875 6.76875 19.4625 7.10625C19.8375 7.44375 20.025 7.9 20.025 8.475C20.025 8.825 19.925 9.15625 19.725 9.46875C19.525 9.78125 19.175 10.175 18.675 10.65C17.85 11.375 17.3438 11.9437 17.1562 12.3562C16.9688 12.7688 16.875 13.55 16.875 14.7ZM9 24C8.175 24 7.46875 23.7062 6.88125 23.1187C6.29375 22.5312 6 21.825 6 21V3C6 2.175 6.29375 1.46875 6.88125 0.88125C7.46875 0.29375 8.175 0 9 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H9ZM9 21H27V3H9V21ZM3 30C2.175 30 1.46875 29.7062 0.88125 29.1187C0.29375 28.5312 0 27.825 0 27V6H3V27H24V30H3ZM9 3V21V3Z" />
      </svg>
    ),
  },
  {
    id: "culture",
    name: "Culture",
    icon: (cls) => (
      <svg className={cls} viewBox="0 0 30 30" fill="currentColor">
        <path d="M15 30C12.925 30 10.975 29.6063 9.15 28.8188C7.325 28.0312 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.96875 22.675 1.18125 20.85C0.39375 19.025 0 17.075 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.96875 9.15 1.18125C10.975 0.39375 12.925 0 15 0C17.075 0 19.025 0.39375 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0312 7.325 28.8188 9.15C29.6063 10.975 30 12.925 30 15C30 17.075 29.6063 19.025 28.8188 20.85C28.0312 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0312 20.85 28.8188C19.025 29.6063 17.075 30 15 30ZM13.5 26.925V24C12.675 24 11.9688 23.7062 11.3813 23.1187C10.7938 22.5312 10.5 21.825 10.5 21V19.5L3.3 12.3C3.225 12.75 3.15625 13.2 3.09375 13.65C3.03125 14.1 3 14.55 3 15C3 18.025 3.99375 20.675 5.98125 22.95C7.96875 25.225 10.475 26.55 13.5 26.925ZM23.85 23.1C24.875 21.975 25.6562 20.7188 26.1938 19.3312C26.7313 17.9437 27 16.5 27 15C27 12.55 26.3187 10.3125 24.9562 8.2875C23.5938 6.2625 21.775 4.8 19.5 3.9V4.5C19.5 5.325 19.2062 6.03125 18.6187 6.61875C18.0312 7.20625 17.325 7.5 16.5 7.5H13.5V10.5C13.5 10.925 13.3563 11.2812 13.0688 11.5688C12.7812 11.8563 12.425 12 12 12H9V15H18C18.425 15 18.7812 15.1437 19.0688 15.4312C19.3563 15.7188 19.5 16.075 19.5 16.5V21H21C21.65 21 22.2375 21.1937 22.7625 21.5812C23.2875 21.9688 23.65 22.475 23.85 23.1Z" />
      </svg>
    ),
  },
];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export const EditGroupSettings: React.FC = () => {
  // State quản lý dữ liệu form
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("Advanced C1 Debate Club");
  const [description, setDescription] = useState(
    "A high-level discussion group focusing on complex socioeconomic issues, academic literature, and persuasive speaking techniques. Members are expected to have a solid C1 proficiency level.",
  );
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [showIconModal, setShowIconModal] = useState(false);

  const [selectedCustomIcon, setSelectedCustomIcon] = useState<string | null>(
    null,
  );

  const MAX_CHARS = 500;

  // Lấy Icon Component đang chọn để hiển thị Preview
  const renderSelectedIcon = () => {
    if (selectedCustomIcon) {
      const icon = ALL_ICONS.find((item) => item.id === selectedCustomIcon);

      return icon ? icon.icon("w-9 h-9") : null;
    }

    const Icon = ICON_OPTIONS[selectedIconIndex].Component;

    return <Icon className="w-9 h-9" />;
  };
  // Xử lý submit

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // gọi API save ở đây sau này
      // await updateGroupInfo()

      setNotification({
        type: "success",
        message: "Saved group settings successfully!",
      });

      setTimeout(() => {
        setNotification(null);
        navigate('/study-groups/workspace-leader')
      }, 3000);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to save group settings. Please try again.",
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-['Inter',sans-serif]">
      {showIconModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="rounded-2xl p-6 w-[420px] shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-900">
                Choose Group Icon
              </h3>

              <button
                onClick={() => setShowIconModal(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {ALL_ICONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCustomIcon(item.id);
                    setShowIconModal(false);
                  }}
                  className={`
              h-14 w-14 rounded-xl flex items-center justify-center
              border transition
              ${
                selectedCustomIcon === item.id
                  ? "bg-sky-100 border-sky-700 text-sky-700"
                  : "bg-white border-slate-300 text-gray-700 hover:bg-slate-100"
              }
            `}
                >
                  {item.icon("w-7 h-7")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl shadow-lg border flex items-center gap-3 transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {notification.type === "success" ? (
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
                d="M5 13l4 4L19 7"
              />
            </svg>
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
                d="M12 9v3m0 4h.01M10.29 3.86l-7.82 14a2 2 0 001.71 3h15.64a2 2 0 001.71-3l-7.82-14a2 2 0 00-3.42 0z"
              />
            </svg>
          )}

          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}
      {/* Top Header / App Bar */}
      <header className="sticky top-0 z-10 px-4 py-5 sm:px-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/study-groups/workspace-leader")}
          className="text-gray-700 hover:text-sky-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <h1 className="!text-sky-700 !text-2xl !font-bold !leading-8 !font-['Inter']">
          Edit Group Info
        </h1>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* ================= LEFT COLUMN: FORM EDIT ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-sm flex flex-col gap-6">
              <h2 className="!text-2xl !font-semibold !text-gray-900">
                General Information
              </h2>

              <div className="flex flex-col gap-6">
                {/* Field: Group Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="groupName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Group Name
                  </label>
                  <input
                    id="groupName"
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-slate-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition"
                    placeholder="Enter group name"
                  />
                </div>

                {/* Field: Description */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-slate-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition resize-none"
                    placeholder="Describe your group..."
                  />
                  <div className="text-right text-xs font-medium text-gray-500">
                    {description.length} / {MAX_CHARS} characters
                  </div>
                </div>

                {/* Field: Group Icon Picker */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Group Icon
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ICON_OPTIONS.map((item, index) => {
                      const IconComp = item.Component;
                      const isSelected =
                        selectedCustomIcon !== null
                          ? item.id === "custom"
                          : selectedIconIndex === index;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (item.id === "custom") {
                              setShowIconModal(true);
                            } else {
                              setSelectedIconIndex(index);
                              setSelectedCustomIcon(null);
                            }
                          }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-blue-100 border-2 border-sky-700 text-sky-700 shadow-sm"
                              : "bg-white border border-slate-300 text-gray-700 hover:bg-slate-100"
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PREVIEW CARD & ACTIONS ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Preview Card */}
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
              {/* Card Banner */}
              <div className="h-32 bg-blue-600 relative">
                {/* Group Avatar Overlay */}
                <div className="absolute left-8 -bottom-10 p-1 bg-slate-50 rounded-2xl shadow-sm">
                  <div className="w-20 h-20 bg-sky-700 rounded-xl flex items-center justify-center text-white">
                    {renderSelectedIcon()}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-8 pt-14 pb-8 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                      {groupName || "Group Name"}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-800/10 text-emerald-800 text-xs font-bold rounded">
                        C1 Level
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        • 4 Members
                      </span>
                    </div>
                  </div>
                  <StarIcon className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                <p className="text-base text-gray-700 leading-relaxed break-words">
                  {description || "No description provided."}
                </p>

                {/* Member Avatars */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-50 object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Member 1"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-50 object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Member 2"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-50 object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                      alt="Member 3"
                    />
                    <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-slate-50 flex items-center justify-center text-[10px] font-bold text-gray-700">
                      +45
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Active now
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <CheckIcon className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={() => navigate("/study-groups/workspace-leader")}
                type="button"
                className="w-full py-3.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-gray-700 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditGroupSettings;
