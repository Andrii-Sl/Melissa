"use client";

import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    });

    if (res.ok) window.location.href = "/dashboard";
    else alert("Ошибка");
  };

  return (
    <div className="login">
      <h1>Вход</h1>

      <input
        placeholder="Телефон или 140578"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Код"
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={login}>Войти</button>
    </div>
  );
}
