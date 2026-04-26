"use client";

export default function Header() {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      right: 0,
      padding: "20px"
    }}>
      <a href="/login" style={{
        color: "#fff",
        textDecoration: "none",
        border: "1px solid #fff",
        padding: "8px 12px",
        borderRadius: "6px"
      }}>
        Личный кабинет
      </a>
    </div>
  );
      }
