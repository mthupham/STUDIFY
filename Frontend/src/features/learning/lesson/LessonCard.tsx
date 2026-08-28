import React from "react";

export type LessonStatus = "completed" | "ongoing" | "locked";

export interface LessonProps {
  id?: string;
  title: string;
  description: string;
  status: LessonStatus;
  statusText: string;
  progress?: number;
  highlight?: boolean;
  onClick?: () => void;
}

export const LessonCard: React.FC<LessonProps> = ({
  title,
  description,
  status,
  statusText,
  progress = 0,
  highlight,
  onClick,
}) => {
  const baseCardStyle = "relative z-10 rounded-2xl p-5 md:p-6 transition-all";
  let statusCardStyle = "";
  let statusTextStyle = "text-xs font-bold whitespace-nowrap ";

  switch (status) {
    case "completed":
      statusCardStyle =
        "bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm";
      statusTextStyle += "text-blue-700";
      break;
    case "ongoing":
      statusCardStyle = `bg-white border-2 border-blue-700 ${highlight ? "shadow-[0_4px_8px_rgba(0,74,198,0.2)]" : "shadow-md"}`;
      statusTextStyle += "text-blue-600";
      break;
    case "locked":
      statusCardStyle = "bg-slate-50 border border-slate-100 opacity-60";
      statusTextStyle += "text-slate-500";
      break;
  }

 const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
  if (status === "locked") {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onClick?.();
  }
};
  return (
   <article
  role="button"
  tabIndex={status === "locked" ? -1 : 0}
  onClick={status === "locked" ? undefined : onClick}
  onKeyDown={handleKeyDown}
  aria-disabled={status === "locked"}
  className={`${baseCardStyle} ${statusCardStyle} ${
    status === "locked"
      ? "cursor-not-allowed"
      : "cursor-pointer hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
  } select-none`}
>
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-3">
        <h3 className="m-0 text-slate-900 text-lg md:text-xl font-semibold leading-snug">
          {title}
        </h3>
        <span className={statusTextStyle}>{statusText}</span>
      </header>

      {status === "ongoing" && (
        <div
          className="mt-2 w-full h-1.5 rounded-full bg-indigo-50 overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className="block h-full bg-blue-700 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </article>
  );
};
