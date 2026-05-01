"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function logout() {
    document.cookie =
      "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  }

  return (
    <button
      onClick={logout}
      style={{
        height:"42px",
        padding:"0 16px",
        border:"1px solid #ddd",
        background:"#fff",
        cursor:"pointer"
      }}
    >
      Выйти
    </button>
  );
}
