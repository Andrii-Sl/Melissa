"use client";

export default function Login() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Вход</h1>

      <input placeholder="Email" /><br /><br />
      <input placeholder="Пароль" /><br /><br />

      <a href="/cabinet">
        <button>Войти</button>
      </a>
    </div>
  );
}
