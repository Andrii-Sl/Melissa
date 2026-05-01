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
        border:"1px solid #ddd",
        background:"#fff",
        padding:"10px 14px",
        cursor:"pointer"
      }}
    >
      Выйти
    </button>
  );
}
