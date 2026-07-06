import React from 'react';

export default function UserProfile() {
  return (
    // Toàn bộ vùng chứa trang Profile (Layout tổng thể)
    <div className="relative w-full h-full min-h-screen pl-[280px] pr-6 pt-24 pb-[90px] bg-[#F9F9FF] flex flex-col justify-start items-flex-start">
      
      {/* ==========================================================================
          HEADER - THANH ĐIỀU HƯỚNG TRÊN CÙNG
          ========================================================================== */}
      <header className="absolute top-0 left-64 w-[1024px] h-20 px-6 bg-[#F9F9FF] shadow-sm flex justify-between items-center z-10">
        <div className="flex flex-col justify-start items-start">
          <h2 className="font-sans font-bold text-3xl text-[#151C27] leading-10">
            Welcome back, <span className="text-[#0058BE]">username</span>
          </h2>
        </div>
      </header>

      {/* ==========================================================================
          ASIDE - THANH ĐIỀU HƯỚNG BÊN TRÁI (SIDEBAR)
          ========================================================================== */}
      <aside className="absolute top-0 left-0 w-64 h-full bg-[#F9F9FF] shadow-sm border-r border-[#C2C6D6] flex flex-col justify-start items-start">
        {/* Logo / Tên Ứng Dụng */}
        <div className="w-full p-6 flex flex-col justify-start items-start">
          <h1 className="w-full font-sans font-bold text-2xl text-[#0058BE] leading-8">
            Studify
          </h1>
        </div>

        {/* Danh sách các liên kết điều hướng (Nav Links) */}
        <nav className="w-full flex-1 pt-4 px-4 flex flex-col justify-start items-start gap-2">
          {/* Menu Item: Dashboard */}
          <a href="#dashboard" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-[18px] h-[18px] bg-[#424754]" /> {/* Thay thế bằng Icon thực tế */}
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">Dashboard</span>
          </a>

          {/* Menu Item: Roadmap */}
          <a href="#roadmap" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-[18px] h-[18px] bg-[#424754]" />
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">Roadmap</span>
          </a>

          {/* Menu Item: Lessons */}
          <a href="#lessons" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-[22px] h-[18px] bg-[#424754]" />
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">Lessons</span>
          </a>

          {/* Menu Item: Flashcards */}
          <a href="#flashcards" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-[20px] h-[19px] bg-[#424754]" />
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">Flashcards</span>
          </a>

          {/* Menu Item: Study Groups */}
          <a href="#groups" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-6 h-3 bg-[#424754]" />
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">Study Groups</span>
          </a>

          {/* Menu Item: AI Speaking */}
          <a href="#ai-speaking" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-[14px] h-[19px] bg-[#424754]" />
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">AI Speaking</span>
          </a>

          {/* Menu Item: Settings */}
          <a href="#settings" className="w-full px-4 py-3 rounded-xl flex justify-start items-center gap-3 hover:bg-slate-100 transition-colors">
            <div className="w-[20px] h-5 bg-[#424754]" />
            <span className="font-sans font-semibold text-sm text-[#424754] leading-5">Settings</span>
          </a>
        </nav>

        {/* Nút Đăng Xuất nằm ở đáy Sidebar */}
        <div className="w-full p-4 flex flex-col justify-start items-start">
          <button className="w-full py-3 bg-[#0058BE] text-white shadow-sm rounded-xl font-sans font-semibold text-sm leading-5 justify-center items-center flex hover:bg-[#004AC6] transition-colors">
            Sign out
          </button>
        </div>
      </aside>

      {/* ==========================================================================
          MAIN CONTENT - VÙNG HIỂN THỊ CHÍNH
          ========================================================================== */}
      <main className="w-full max-w-[1280px] p-8 flex flex-col justify-start items-start gap-8">
        
        {/* PHẦN CHỨA THÔNG TIN AVATAR & USERNAME */}
        <section className="w-full p-10 bg-white shadow-md rounded-xl flex flex-col justify-start items-start">
          <div className="w-full flex justify-start items-start gap-8">
            {/* Vùng hiển thị Avatar lớn */}
            <div className="flex flex-col justify-start items-start">
              <div className="w-40 h-40 rounded-full bg-[#0058BE] shadow-md border-4 border-white overflow-hidden" title="Hồng Hạnh" />
            </div>
            
            {/* Tên người dùng & Nút Chỉnh sửa */}
            <div className="flex-1 pt-2 flex flex-col justify-start items-start gap-2">
              <h1 className="font-sans font-bold text-3xl text-[#131B2E] leading-10">
                Username
              </h1>
              {/* Khoảng trống đệm */}
              <div className="w-[576px] max-w-[576px] pb-4" />
              <button className="px-8 py-3 bg-[#004AC6] text-white shadow-sm rounded-8 font-sans font-medium text-sm tracking-wide leading-5 hover:bg-[#003da5] transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        {/* BENTO GRID LAYOUT - CHỨA CÀI ĐẶT VÀ TIẾN TRÌNH */}
        <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-6">
          
          {/* CỘT TRÁI: CÀI ĐẶT CHUNG (GENERAL SETTINGS) */}
          <section className="w-full lg:w-2/3 p-8 bg-white shadow-md rounded-xl flex flex-col justify-start items-start gap-8">
            {/* Tiêu đề vùng cài đặt */}
            <div className="w-full pb-4 border-b border-[#C3C6D7] flex justify-start items-center">
              <div className="flex justify-start items-center gap-2">
                <div className="w-5 h-5 bg-[#004AC6]" /> {/* Icon cài đặt */}
                <h2 className="font-sans font-semibold text-xl text-[#131B2E] leading-7">
                  General Settings
                </h2>
              </div>
            </div>

            {/* Các trường nhập liệu (Form Fields) */}
            <div className="w-full flex flex-col justify-start items-start gap-6">
              {/* Trường Email */}
              <div className="w-full flex flex-col justify-start items-start">
                <label className="w-full font-sans font-medium text-sm text-[#434655] leading-5 tracking-wide mb-1">
                  Email Address
                </label>
                <div className="w-full px-4 py-3 bg-[#F2F3FF] rounded-8 border border-[#C3C6D7] flex justify-start items-center">
                  <span className="w-full font-sans font-normal text-base text-[#131B2E] leading-6 break-all">
                    honghanh.lingo@example.com
                  </span>
                </div>
              </div>

              {/* Trường Ngôn ngữ giao diện */}
              <div className="w-full pt-4 flex flex-col justify-start items-start">
                <label className="w-full font-sans font-medium text-sm text-[#434655] leading-5 tracking-wide mb-1">
                  Interface Language
                </label>
                <div className="w-full h-[50px] px-4 py-3 bg-[#F2F3FF] rounded-8 border border-[#C3C6D7] flex justify-start items-center gap-2">
                  <div className="w-[16.67px] h-[16.67px] bg-[#434655]" /> {/* Icon quả địa cầu/ngôn ngữ */}
                  <span className="font-sans font-normal text-base text-[#131B2E] leading-6">
                    Tiếng Việt (Vietnam)
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* CỘT PHẢI: TIẾN TRÌNH HỌC TẬP (LEARNING PROGRESS) */}
          <section className="w-full lg:w-1/3 p-6 bg-white shadow-md rounded-xl flex flex-col justify-start items-start gap-4">
            <div className="w-full pb-4 flex flex-col justify-start items-start gap-6">
              {/* Hiển thị Level hiện tại */}
              <div className="w-full flex justify-between items-start">
                <span className="font-sans font-medium text-sm text-[#131B2E] leading-5 tracking-wide">
                  Your current level:
                </span>
                <span className="font-sans font-bold text-sm text-[#0058BE] leading-5">
                  B2 LEVEL
                </span>
              </div>

              {/* Thanh tiến trình phần trăm (Progress Bar) */}
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full flex justify-between items-start">
                  <span className="font-sans font-medium text-sm text-[#131B2E] leading-5 tracking-wide">
                    Complete:
                  </span>
                  <span className="font-sans font-medium text-sm text-[#004AC6] leading-5 tracking-wide">
                    90%
                  </span>
                </div>
                {/* Vỏ bọc thanh Progress */}
                <div className="w-full h-2 relative bg-[#EAEDFF] rounded-full overflow-hidden">
                  {/* Thanh phần trăm thực tế (90%) */}
                  <div className="absolute top-0 left-0 h-full bg-[#004AC6] rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            {/* Nút hành động kêu gọi tiếp tục học */}
            <button className="w-full py-3 border border-[#C3C6D7] rounded-8 font-sans font-medium text-sm text-[#434655] leading-5 tracking-wide flex justify-center items-center hover:bg-slate-50 transition-colors">
              Let&apos;s keep going!
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}