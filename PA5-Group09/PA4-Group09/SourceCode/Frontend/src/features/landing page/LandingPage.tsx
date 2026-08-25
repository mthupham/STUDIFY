import { Link } from "react-router-dom";
import HatIcon from "../../assets/Studify_icon/hat.svg";
import AiIcon from "../../assets/Studify_icon/ai.svg";
import RoadmapIcon from "../../assets/Studify_icon/Icon.svg";
import TeamIcon from "../../assets/Studify_icon/team.svg";
import GameIcon from "../../assets/Studify_icon/gamified.svg";
import Image01 from "../../assets/Studify_Image/Main Registration Container/Section - Left Side_ Informative/Learner focused.png";

const features = [
  {
    title: "Personalized Roadmaps",
    description:
      "Our algorithm analyzes your gaps and builds a unique CEFR path just for you.",
    className: "bg-indigo-50 border-slate-200",
    titleColor: "text-gray-900",
    accent: "bg-sky-700",
    icon: RoadmapIcon,
  },
  {
    title: "AI Speaking Assistant",
    description:
      "Get instant pronunciation and grammar feedback in real-time conversations.",
    className: "bg-slate-800 border-slate-700",
    titleColor: "text-white",
    accent: "bg-sky-700",
    icon: AiIcon,
  },
  {
    title: "Study Groups",
    description:
      "Learn faster with peers, accountability, and shared study moments.",
    className: "bg-emerald-300 border-emerald-200",
    titleColor: "text-emerald-800",
    accent: "bg-emerald-700",
    icon: TeamIcon,
  },
  {
    title: "Gamified Lessons",
    description:
      "Keep your streak alive and earn exclusive CEFR badges for every milestone.",
    className: "bg-yellow-700 border-yellow-600",
    titleColor: "text-white",
    accent: "bg-yellow-800",
    icon: GameIcon,
  },
];

const roadmapHighlights = [
  {
    level: "C2",
    title: "Proficiency",
    description: "Mastery level for professional environments.",
  },
  {
    level: "B2",
    title: "Upper Intermediate",
    description: "Spontaneous interaction with native speakers.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: ["Courses", "AI Assistant", "Study Groups", "Roadmaps"],
  },
  {
    title: "Resources",
    links: ["Blog", "CEFR Guide", "Community", "Help Center"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Privacy", "Terms"],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header navigation */}
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={HatIcon}
            alt="Mô tả ảnh"
            className="h-7 w-7 rounded-lg object-cover"
          />
          <span className="text-2xl font-bold text-sky-700">Studify</span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 sm:px-6 lg:px-8">
        {/* Hero section */}
        <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_115.35%_200.61%_at_100.00%_0.00%,_#E7EEFE_0%,_#F9F9FF_100%)] px-6 py-14 shadow-sm sm:px-10 lg:px-12 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">
                  World-class Language Learning
                </span>
              </div>
              <h1
                className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl"
                style={{ color: "#151C27" }}
              >
                Master English Through Personalized Learning Paths
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-7 text-gray-700">
                Experience a curriculum that adapts to your pace. From AI
                speaking feedback to global study groups, accelerate your
                fluency with the science of linguistics.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="rounded-xl bg-sky-700 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-sky-800"
                >
                  Already have an account? Log in here
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute left-10 top-0 h-28 w-28 rounded-full bg-sky-700/10 blur-3xl" />
              <img
                src={Image01}
                alt="Students learning English"
                className="w-full rounded-[32px] border-8 border-white object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="bg-white px-6 py-16 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-4xl font-bold sm:text-5xl"
              style={{ color: "#151C27" }}
            >
              Everything You Need to Fluency
            </h2>
            <p className="mt-3 text-base leading-6 text-gray-700">
              Scientifically designed features to help you retain more and speak
              faster.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`rounded-3xl border p-8 ${feature.className}`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${feature.titleColor === "text-white" ? "bg-white/10" : "bg-white/80"}`}
                >
                  <img
                    src={feature.icon}
                    alt=""
                    className={`h-6 w-6 object-contain ${feature.titleColor === "text-white" ? "brightness-0 invert" : ""}`}
                  />
                </div>
                <h3
                  className={`mt-4 text-2xl font-semibold ${feature.titleColor}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mt-3 text-base leading-6 ${feature.titleColor === "text-white" ? "text-slate-200" : "text-gray-700"}`}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Roadmap section */}
        <section className="rounded-[32px] bg-violet-100 px-6 py-16 sm:px-10 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ color: "#151C27" }}
              >
                Your Journey to Fluency
              </h2>
              <p className="mt-4 text-lg leading-7 text-gray-700">
                We follow the Common European Framework of Reference for
                Languages (CEFR) to ensure your progress is globally recognized
                and measured with precision.
              </p>

              <div className="mt-8 space-y-4">
                {roadmapHighlights.map((item) => (
                  <div
                    key={item.level}
                    className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-800">
                        {item.level}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-xl rounded-[40px] bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
              {/* Biểu tượng lá cờ ở trên cùng */}
              <div className="flex justify-center mb-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2152c5] text-white shadow-lg shadow-blue-500/20">
                  {/* Thay bằng icon lá cờ của bạn, ở đây dùng SVG lá cờ đơn giản */}
                  <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 15 17" 
  fill="currentColor" /* Giúp SVG tự động ăn theo màu chữ của thẻ cha (ví dụ: text-white) */
  className="w-6 h-6"   /* Điều chỉnh kích thước tùy ý bằng Tailwind */
>
  <path d="M0 17V0H9L9.4 2H15V12H8L7.6 10H2V17H0ZM9.65 10H13V4H7.75L7.35 2H2V8H9.25L9.65 10Z" />
</svg>
                </div>
              </div>

              {/* Thanh lộ trình nằm ngang */}
              <div className="relative flex items-center justify-between px-4 mb-12">
                {/* Đường nối xuyên suốt phía sau */}
                <div className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 bg-[#cbd5e1]" />

                {/* Nút Đã hoàn thành (Dấu tích xanh) */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#275c3d] text-white border-4 border-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>

                {/* Nút Hiện tại (B1) */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#2152c5] text-white font-medium text-lg border-4 border-white shadow-md">
                  B1
                </div>

                {/* Nút Tiếp theo (B2 - mờ) */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#e2e8f0] text-[#94a3b8] font-medium text-lg border-4 border-white shadow-sm">
                  B2
                </div>
              </div>

              {/* Hai thẻ thông tin nằm cạnh nhau phía dưới */}
              <div className="grid grid-cols-2 gap-5">
                {/* Thẻ Current Focus */}
                <div className="rounded-2xl bg-[#f0f4ff] border border-[#e0e8ff] p-5">
                  <p className="text-[13px] font-semibold text-[#1d4ed8]">
                    Current Focus
                  </p>
                  <p className="mt-2 text-[17px] font-bold text-gray-900">
                    Business Idioms
                  </p>
                </div>

                {/* Thẻ Next Goal */}
                <div className="rounded-2xl bg-[#f0f4ff] border border-[#e0e8ff] p-5">
                  <p className="text-[13px] font-semibold text-[#1d4ed8]">
                    Next Goal
                  </p>
                  <p className="mt-2 text-[17px] font-bold text-gray-900">
                    Complex Tenses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-16 sm:px-0">
          <div className="mx-auto max-w-3xl rounded-[40px] bg-sky-700 px-8 py-12 text-center text-white shadow-2xl sm:px-12">
            <h2 className="text-3xl font-bold">Ready to reach fluency?</h2>
            <p className="mt-4 text-lg leading-7 text-sky-50">
              Join thousands of professionals mastering English today. Start
              your personalized journey for free.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-lg font-semibold text-sky-700 transition-colors hover:bg-slate-100"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-200/80 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-sky-700" />
                <span className="text-2xl font-bold text-sky-700">Studify</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-700">
                The next generation of language learning powered by AI and human
                connection.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  {column.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-300 pt-6 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Linguist Pro Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
