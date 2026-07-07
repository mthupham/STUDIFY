import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoUrl from "../assets/Studify_icon/hat.svg";

// Cấu hình danh sách Menu (Giữ nguyên thông số width/height của Icon từ Figma bạn gửi)
const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
  {
    name: "Roadmap",
    path: "/roadmap",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M12 18L6 15.9L1.35 17.7C1.01667 17.8333 0.708333 17.7958 0.425 17.5875C0.141667 17.3792 0 17.1 0 16.75V2.75C0 2.53333 0.0625 2.34167 0.1875 2.175C0.3125 2.00833 0.483333 1.88333 0.7 1.8L6 0L12 2.1L16.65 0.3C16.9833 0.166667 17.2917 0.204167 17.575 0.4125C17.8583 0.620833 18 0.9 18 1.25V15.25C18 15.4667 17.9375 15.6583 17.8125 15.825C17.6875 15.9917 17.5167 16.1167 17.3 16.2L12 18ZM11 15.55V3.85L7 2.45V14.15L11 15.55ZM13 15.55L16 14.55V2.7L13 3.85V15.55ZM2 15.3L5 14.15V2.45L2 3.45V15.3ZM13 3.85V15.55V3.85ZM5 2.45V14.15V2.45Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
  {
    name: "Lessons",
    path: "/lesson",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
      >
        <path
          d="M11 18L4 14.2V8.2L0 6L11 0L22 6V14H20V7.1L18 8.2V14.2L11 18ZM11 9.7L17.85 6L11 2.3L4.15 6L11 9.7ZM11 15.725L16 13.025V9.25L11 12L6 9.25V13.025L11 15.725Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
  {
    name: "Flashcard",
    path: "/flashcard",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          d="M2 16.8333L1.15 16.4833C0.633333 16.2667 0.2875 15.8917 0.1125 15.3583C-0.0625 14.825 -0.0333333 14.3 0.2 13.7833L2 9.88333V16.8333ZM6 19.0333C5.45 19.0333 4.97917 18.8375 4.5875 18.4458C4.19583 18.0542 4 17.5833 4 17.0333V11.0333L6.65 18.3833C6.7 18.5 6.75 18.6125 6.8 18.7208C6.85 18.8292 6.91667 18.9333 7 19.0333H6ZM11.15 18.9333C10.6167 19.1333 10.1 19.1083 9.6 18.8583C9.1 18.6083 8.75 18.2167 8.55 17.6833L4.1 5.48333C3.9 4.95 3.91667 4.42917 4.15 3.92083C4.38333 3.4125 4.76667 3.06667 5.3 2.88333L12.85 0.133333C13.3833 -0.0666667 13.9 -0.0416667 14.4 0.208333C14.9 0.458333 15.25 0.85 15.45 1.38333L19.9 13.5833C20.1 14.1167 20.0833 14.6375 19.85 15.1458C19.6167 15.6542 19.2333 16 18.7 16.1833L11.15 18.9333ZM9 7.03333C9.28333 7.03333 9.52083 6.9375 9.7125 6.74583C9.90417 6.55417 10 6.31667 10 6.03333C10 5.75 9.90417 5.5125 9.7125 5.32083C9.52083 5.12917 9.28333 5.03333 9 5.03333C8.71667 5.03333 8.47917 5.12917 8.2875 5.32083C8.09583 5.5125 8 5.75 8 6.03333C8 6.31667 8.09583 6.55417 8.2875 6.74583C8.47917 6.9375 8.71667 7.03333 9 7.03333ZM10.45 17.0333L18 14.2833L13.55 2.03333L6 4.78333L10.45 17.0333ZM6 4.78333L13.55 2.03333L6 4.78333Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
  {
    name: "Study Groups",
    path: "/study-groups",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="12"
        viewBox="0 0 24 12"
        fill="none"
      >
        <path
          d="M0 12V10.425C0 9.70833 0.366667 9.125 1.1 8.675C1.83333 8.225 2.8 8 4 8C4.21667 8 4.425 8.00417 4.625 8.0125C4.825 8.02083 5.01667 8.04167 5.2 8.075C4.96667 8.425 4.79167 8.79167 4.675 9.175C4.55833 9.55833 4.5 9.95833 4.5 10.375V12H0ZM6 12V10.375C6 9.84167 6.14583 9.35417 6.4375 8.9125C6.72917 8.47083 7.14167 8.08333 7.675 7.75C8.20833 7.41667 8.84583 7.16667 9.5875 7C10.3292 6.83333 11.1333 6.75 12 6.75C12.8833 6.75 13.6958 6.83333 14.4375 7C15.1792 7.16667 15.8167 7.41667 16.35 7.75C16.8833 8.08333 17.2917 8.47083 17.575 8.9125C17.8583 9.35417 18 9.84167 18 10.375V12H6ZM19.5 12V10.375C19.5 9.94167 19.4458 9.53333 19.3375 9.15C19.2292 8.76667 19.0667 8.40833 18.85 8.075C19.0333 8.04167 19.2208 8.02083 19.4125 8.0125C19.6042 8.00417 19.8 8 20 8C21.2 8 22.1667 8.22083 22.9 8.6625C23.6333 9.10417 24 9.69167 24 10.425V12H19.5ZM8.125 10H15.9C15.7333 9.66667 15.2708 9.375 14.5125 9.125C13.7542 8.875 12.9167 8.75 12 8.75C11.0833 8.75 10.2458 8.875 9.4875 9.125C8.72917 9.375 8.275 9.66667 8.125 10ZM4 7C3.45 7 2.97917 6.80417 2.5875 6.4125C2.19583 6.02083 2 5.55 2 5C2 4.43333 2.19583 3.95833 2.5875 3.575C2.97917 3.19167 3.45 3 4 3C4.56667 3 5.04167 3.19167 5.425 3.575C5.80833 3.95833 6 4.43333 6 5C6 5.55 5.80833 6.02083 5.425 6.4125C5.04167 6.80417 4.56667 7 4 7ZM20 7C19.45 7 18.9792 6.80417 18.5875 6.4125C18.1958 6.02083 18 5.55 18 5C18 4.43333 18.1958 3.95833 18.5875 3.575C18.9792 3.19167 19.45 3 20 3C20.5667 3 21.0417 3.19167 21.425 3.575C21.8083 3.95833 22 4.43333 22 5C22 5.55 21.8083 6.02083 21.425 6.4125C21.0417 6.80417 20.5667 7 20 7ZM12 6C11.1667 6 10.4583 5.70833 9.875 5.125C9.29167 4.54167 9 3.83333 9 3C9 2.15 9.29167 1.4375 9.875 0.8625C10.4583 0.2875 11.1667 0 12 0C12.85 0 13.5625 0.2875 14.1375 0.8625C14.7125 1.4375 15 2.15 15 3C15 3.83333 14.7125 4.54167 14.1375 5.125C13.5625 5.70833 12.85 6 12 6ZM12 4C12.2833 4 12.5208 3.90417 12.7125 3.7125C12.9042 3.52083 13 3.28333 13 3C13 2.71667 12.9042 2.47917 12.7125 2.2875C12.5208 2.09583 12.2833 2 12 2C11.7167 2 11.4792 2.09583 11.2875 2.2875C11.0958 2.47917 11 2.71667 11 3C11 3.28333 11.0958 3.52083 11.2875 3.7125C11.4792 3.90417 11.7167 4 12 4Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
  {
    name: "AI Speaking",
    path: "/ai-speaking",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="19"
        viewBox="0 0 14 19"
        fill="none"
      >
        <path
          d="M7 12C6.16667 12 5.45833 11.7083 4.875 11.125C4.29167 10.5417 4 9.83333 4 9V3C4 2.16667 4.29167 1.45833 4.875 0.875C5.45833 0.291667 6.16667 0 7 0C7.83333 0 8.54167 0.291667 9.125 0.875C9.70833 1.45833 10 2.16667 10 3V9C10 9.83333 9.70833 10.5417 9.125 11.125C8.54167 11.7083 7.83333 12 7 12ZM6 19V15.925C4.26667 15.6917 2.83333 14.9167 1.7 13.6C0.566667 12.2833 0 10.75 0 9H2C2 10.3833 2.4875 11.5625 3.4625 12.5375C4.4375 13.5125 5.61667 14 7 14C8.38333 14 9.5625 13.5125 10.5375 12.5375C11.5125 11.5625 12 10.3833 12 9H14C14 10.75 13.4333 12.2833 12.3 13.6C11.1667 14.9167 9.73333 15.6917 8 15.925V19H6ZM7 10C7.28333 10 7.52083 9.90417 7.7125 9.7125C7.90417 9.52083 8 9.28333 8 9V3C8 2.71667 7.90417 2.47917 7.7125 2.2875C7.52083 2.09583 7.28333 2 7 2C6.71667 2 6.47917 2.09583 6.2875 2.2875C6.09583 2.47917 6 2.71667 6 3V9C6 9.28333 6.09583 9.52083 6.2875 9.7125C6.47917 9.90417 6.71667 10 7 10Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
  {
    name: "Setting",
    path: "/settings",
    iconW: 18,
    iconH: 18,
    // Biến icon thành một function nhận vào fill color
    icon: (fillColor) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          d="M7.3 20L6.9 16.8C6.68333 16.7167 6.47917 16.6167 6.2875 16.5C6.09583 16.3833 5.90833 16.2583 5.725 16.125L2.75 17.375L0 12.625L2.575 10.675C2.55833 10.5583 2.55 10.4458 2.55 10.3375C2.55 10.2292 2.55 10.1167 2.55 10C2.55 9.88333 2.55 9.77083 2.55 9.6625C2.55 9.55417 2.55833 9.44167 2.575 9.325L0 7.375L2.75 2.625L5.725 3.875C5.90833 3.74167 6.1 3.61667 6.3 3.5C6.5 3.38333 6.7 3.28333 6.9 3.2L7.3 0H12.8L13.2 3.2C13.4167 3.28333 13.6208 3.38333 13.8125 3.5C14.0042 3.61667 14.1917 3.74167 14.375 3.875L17.35 2.625L20.1 7.375L17.525 9.325C17.5417 9.44167 17.55 9.55417 17.55 9.6625C17.55 9.77083 17.55 9.88333 17.55 10C17.55 10.1167 17.55 10.2292 17.55 10.3375C17.55 10.4458 17.5333 10.5583 17.5 10.675L20.075 12.625L17.325 17.375L14.375 16.125C14.1917 16.2583 14 16.3833 13.8 16.5C13.6 16.6167 13.4 16.7167 13.2 16.8L12.8 20H7.3ZM9.05 18H11.025L11.375 15.35C11.8917 15.2167 12.3708 15.0208 12.8125 14.7625C13.2542 14.5042 13.6583 14.1917 14.025 13.825L16.5 14.85L17.475 13.15L15.325 11.525C15.4083 11.2917 15.4667 11.0458 15.5 10.7875C15.5333 10.5292 15.55 10.2667 15.55 10C15.55 9.73333 15.5333 9.47083 15.5 9.2125C15.4667 8.95417 15.4083 8.70833 15.325 8.475L17.475 6.85L16.5 5.15L14.025 6.2C13.6583 5.81667 13.2542 5.49583 12.8125 5.2375C12.3708 4.97917 11.8917 4.78333 11.375 4.65L11.05 2H9.075L8.725 4.65C8.20833 4.78333 7.72917 4.97917 7.2875 5.2375C6.84583 5.49583 6.44167 5.80833 6.075 6.175L3.6 5.15L2.625 6.85L4.775 8.45C4.69167 8.7 4.63333 8.95 4.6 9.2C4.56667 9.45 4.55 9.71667 4.55 10C4.55 10.2667 4.56667 10.525 4.6 10.775C4.63333 11.025 4.69167 11.275 4.775 11.525L2.625 13.15L3.6 14.85L6.075 13.8C6.44167 14.1833 6.84583 14.5042 7.2875 14.7625C7.72917 15.0208 8.20833 15.2167 8.725 15.35L9.05 18ZM10.1 13.5C11.0667 13.5 11.8917 13.1583 12.575 12.475C13.2583 11.7917 13.6 10.9667 13.6 10C13.6 9.03333 13.2583 8.20833 12.575 7.525C11.8917 6.84167 11.0667 6.5 10.1 6.5C9.11667 6.5 8.2875 6.84167 7.6125 7.525C6.9375 8.20833 6.6 9.03333 6.6 10C6.6 10.9667 6.9375 11.7917 7.6125 12.475C8.2875 13.1583 9.11667 13.5 10.1 13.5Z"
          fill={fillColor}
          style={{ transition: "fill 0.2s ease" }}
        />
      </svg>
    ),
  },
];

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div style={styles.shell}>
      {/* ================= SIDEBAR CỦA BẠN ================= */}
      <aside style={styles.sidebar}>
        {/* Khu vực Logo */}
        <div
          data-layer="Logo-Container"
          className="Container"
          style={{
            width: "100%",
            padding: "24px 90px", // Padding 24px trên/dưới để tạo khoảng cách với menu, 16px trái/phải để bằng lề với menu
            display: "flex",
            alignItems: "center", // Căn logo chữ nằm CHÍNH GIỮA chiều ngang sidebar
            boxSizing: "border-box",
          }}
        >
          <NavLink to="/landing-page" style={{ textDecoration: "none" }}>
            <span
              data-layer="Studify"
              className="Studify"
              style={{
                color: "#0058BE",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: "700",
                lineHeight: "32px", // Thêm đơn vị px để an toàn trên mọi trình duyệt
                wordWrap: "break-word",
              }}
            >
              Studify
            </span>
          </NavLink>
        </div>

        {/* Danh sách Menu tự động đổi màu theo URL */}
        <nav style={styles.navList}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.linkBase,
                // Nếu đúng trang hiện tại -> nạp style Active, ngược lại -> nạp style Normal
                ...(isActive ? styles.linkActive : styles.linkNormal),
              })}
            >
              {({ isActive }) => {
                // 1. Tính toán màu sắc trước khi return JSX để dùng chung cho cả Icon và Text
                const currentColor = isActive ? "#0058BE" : "#424754";

                return (
                  <>
                    {/* Container bọc Icon - Đã dọn dẹp kỹ thuật Mask lỗi */}
                    <div
                      style={{
                        ...styles.containerBase,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: item.iconW, // Đảm bảo khung bọc ngoài có kích thước chuẩn
                        height: item.iconH,
                      }}
                    >
                      {/* 2. THAY THẾ QUAN TRỌNG: Gọi hàm icon và truyền màu hiện tại vào */}
                      {typeof item.icon === "function" &&
                        item.icon(currentColor)}
                    </div>

                    {/* Container bọc Văn bản */}
                    <div style={styles.containerBase}>
                      <span
                        style={{
                          ...styles.textBase,
                          // Đổi màu chữ theo trang dựa trên biến chung
                          color: currentColor,
                          // Đổi độ đậm chữ theo trang
                          fontWeight: isActive ? "700" : "400",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </>
                );
              }}
            </NavLink>
          ))}
        </nav>

        <div
          data-layer="Signout-Container"
          style={{
            width: "100%",
            padding: "24px 16px", // Padding đồng bộ với lề trái/phải của menu
            boxSizing: "border-box",
            marginTop: "auto", // Đẩy nút xuống đáy sidebar nếu sidebar sử dụng flex-direction: column
          }}
        >
          <button
            data-layer="Button"
            onClick={() => {
              navigate("/landing-page");
            }}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0058BE",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
              borderRadius: "12px",
              border: "none", // Khử border mặc định của button
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            // Thêm hiệu ứng hover nhanh bằng inline event nếu không dùng Tailwind
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#004AC6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0058BE")}
          >
            <span
              data-layer="Sign out"
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "Inter",
                fontWeight: "600",
                lineHeight: "20px",
                textAlign: "center",
              }}
            >
              Sign out
            </span>
          </button>
        </div>
      </aside>

      {/* ================= NỘI DUNG CHÍNH BÊN PHẢI ================= */}
      <div style={styles.mainArea}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.searchPill}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
                fill="#727785"
              />
            </svg>
            <input
              type="text"
              placeholder="Search lesson..."
              style={styles.searchInput}
            />
          </div>
          <div style={styles.headerRight}>
            <button
              style={styles.iconButton}
              aria-label="Notification" // Thêm thuộc tính này để hỗ trợ trình đọc màn hình (Accessibility)
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                style={{ display: "block" }} // Tránh lỗi khoảng cách nhỏ (line-gap) dưới thẻ SVG
              >
                <path
                  d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z"
                  fill="currentColor" // Đổi từ '#424754' thành 'currentColor' để màu tự ăn theo thuộc tính 'color' của nút bấm bên ngoài
                />
              </svg>
            </button>
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <div style={styles.avatar}>A</div>
            </NavLink>
          </div>
        </header>

        {/* Khối hiển thị nội dung các trang con */}
        <main style={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}

// ================= HỆ THỐNG STYLES GỐC TỪ FIGMA =================
const styles = {
  shell: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    background: "#F8FAFC",
  },
  sidebar: {
    width: 280, // Tăng nhẹ để menu co giãn thoải mái theo padding Figma
    height: "100vh",
    background: "#FFFFFF", // Đổi về nền trắng để nổi bật menu xanh của bạn
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0", // padding trên dưới, còn trái phải để menu chiếm 100%
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
  },
  logoArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    padding: "0 16px",
  },
  logoImage: {
    width: 48,
    height: 48,
  },
  brandText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 700,
    color: "#1E293B",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: 4, // Khoảng cách gap: 4 giữa các nút như code Figma của bạn
    width: "100%",
  },

  // --- Bắt đầu phần Style sao chép chính xác từ code Figma của bạn ---
  linkBase: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
    display: "inline-flex",
    textDecoration: "none", // Xóa gạch chân mặc định của thẻ link
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  linkNormal: {
    background: "transparent",
    borderRight: "4px transparent solid",
  },
  linkActive: {
    background: "#F0F3FF", // Màu nền Active của bạn
    borderRight: "4px #0058BE solid", // Thanh dọc bên phải của bạn
  },
  containerBase: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "inline-flex",
  },
  textBase: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: 16,
    fontFamily: "Inter",
    lineHeight: "24px",
    wordWrap: "break-word",
  },
  // --- Kết thúc phần Style Figma ---

  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    height: 70,
    background: "#FFFFFF",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    boxSizing: "border-box",
  },
  searchPill: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#F8FAFC",
    border: "1px solid #E5E7EB",
    borderRadius: 999,
    padding: "0 16px",
    minWidth: 300,
    height: 40,
  },
  searchIcon: { fontSize: 14, color: "#6B7280" },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: 14,
  },
  headerRight: { display: "flex", alignItems: "center", gap: 16 },
  iconButton: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justify_content: "center",
    cursor: "pointer",
  },
  bellIcon: { fontSize: 16, color: "#374151" },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#EF4444",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    overflowY: "auto",
    padding: 32,
    background: "#F8FAFC",
    boxSizing: "border-box",
  },
};
