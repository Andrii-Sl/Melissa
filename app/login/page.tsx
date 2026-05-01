"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("client");

  function enter() {
    document.cookie = `role=${role}; path=/`;

    if (role === "admin") router.push("/admin");
    if (role === "supplier") router.push("/supplier");
    if (role === "client") router.push("/dashboard");
  }

  return (
    <main style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <div style={{
        width:"420px",
        border:"1px solid #ddd",
        padding:"40px"
      }}>
        <h1 style={{marginBottom:"20px"}}>Вход</h1>

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          style={{
            width:"100%",
            height:"46px",
            marginBottom:"16px"
          }}
        >
          <option value="client">Клиент</option>
          <option value="admin">Админ</option>
          <option value="supplier">Dostawca</option>
        </select>

        <button
          onClick={enter}
          style={{
            width:"100%",
            height:"46px",
            background:"#111",
            color:"#fff",
            border:"none"
          }}
        >
          Войти
        </button>
      </div>
    </main>
  );
}
