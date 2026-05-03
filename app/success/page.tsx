"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const request = searchParams.get("request") || "—";

  return (
    <main style={{
      minHeight:"100svh",
      background:"#111",
      color:"#fff",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      padding:"20px"
    }}>
      <div style={{
        maxWidth:"520px",
        width:"100%",
        background:"#1a1a1a",
        padding:"32px",
        border:"1px solid #333"
      }}>
        <div style={{color:"#d10000",fontSize:"12px",marginBottom:"10px"}}>
          ЗАЯВКА ПРИНЯТА
        </div>

        <h1 style={{fontSize:"38px",margin:"0 0 20px"}}>
          Спасибо
        </h1>

        <p style={{color:"#ccc",marginBottom:"18px"}}>
          Ваш запрос успешно отправлен.
        </p>

        <p style={{marginBottom:"28px"}}>
          Номер заявки: <strong>{request}</strong>
        </p>

        <Link
          href="/"
          style={{
            display:"inline-block",
            background:"#d10000",
            color:"#fff",
            padding:"16px 24px",
            textDecoration:"none",
            fontWeight:"700"
          }}
        >
          На главную
        </Link>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}