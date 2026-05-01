"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {

    if (email === "admin@mail.com" && password === "1234") {
      document.cookie = "role=admin; path=/";
      router.push("/admin");
      return;
    }

    if (email === "client@mail.com" && password === "1234") {
      document.cookie = "role=client; path=/";
      router.push("/dashboard");
      return;
    }

    if (email === "supplier@mail.com" && password === "1234") {
      document.cookie = "role=supplier; path=/";
      router.push("/supplier");
      return;
    }

    alert("Неверный логин или пароль");
  }

  return (
    <main
      style={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#fff",
        fontFamily:"Arial"
      }}
    >
      <div
        style={{
          width:"420px",
          border:"1px solid #ddd",
          padding:"40px"
        }}
      >
        <h1 style={{marginBottom:"24px"}}>Вход</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            height:"48px",
            marginBottom:"14px",
            border:"1px solid #ddd",
            padding:"0 12px"
          }}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            height:"48px",
            marginBottom:"18px",
            border:"1px solid #ddd",
            padding:"0 12px"
          }}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            height:"48px",
            background:"#111",
            color:"#fff",
            border:"none",
            cursor:"pointer"
          }}
        >
          Войти
        </button>

        <p style={{marginTop:"18px", fontSize:"13px", color:"#777"}}>
          demo:
          admin@mail.com / 1234
        </p>
      </div>
    </main>
  );
}
