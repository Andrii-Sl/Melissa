"use client";

import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Ошибка входа");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Вход</h1>

      <input
        placeholder="Телефон или 140578"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Код (или 1234)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
}
