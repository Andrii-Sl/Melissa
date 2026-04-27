"use client";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");

  const register = async () => {
    await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email })
    });

    localStorage.setItem("user", email);
    location.href = "/cabinet";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Регистрация</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={register}>Создать аккаунт</button>
    </div>
  );
}
