"use client";

export default function Login() {
  const login = () => {
    localStorage.setItem("user", "demo");
    location.href = "/cabinet";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Вход</h1>
      <button onClick={login}>Войти</button>
    </div>
  );
}
