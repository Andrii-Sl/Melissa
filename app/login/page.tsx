"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/data/users";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      alert("Неверный логин или пароль");
      return;
    }

    document.cookie = `role=${user.role}; path=/`;

    if (user.role === "admin") {
      router.push("/admin");
      return;
    }

    if (user.role === "client") {
      router.push("/dashboard");
      return;
    }

    if (user.role === "supplier") {
      router.push("/supplier");
      return;
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "420px",
          border: "1px solid #ddd",
          padding: "40px",
          background: "#fff"
        }}
      >
        <h1
          style={{
            marginBottom: "24px",
            fontSize: "28px"
          }}
        >
          Вход
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            height: "48px",
            marginBottom: "14px",
            border: "1px solid #ddd",
            padding: "0 12px"
          }}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            height: "48px",
            marginBottom: "18px",
            border: "1px solid #ddd",
            padding: "0 12px"
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            height: "48px",
            background: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Войти
        </button>

        <p
          style={{
            marginTop: "18px",
            fontSize: "13px",
            color: "#777"
          }}
        >
          demo:
          admin@mail.com / 1234
        </p>
      </div>
    </main>
  );
          }
