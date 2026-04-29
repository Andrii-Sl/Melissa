"use client";

import { useState } from "react";

export default function Login() {
  const [value, setValue] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ value })
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Ошибка входа");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Вход</h2>

      <input
        placeholder="Телефон или код 140578"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={login}>Войти</button>
    </div>
  );
}
