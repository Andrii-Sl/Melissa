export default function LoginPage() {
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
          border: "1px solid #e5e5e5",
          padding: "40px",
          background: "#fff"
        }}
      >
        <h1 style={{ marginBottom: "24px", fontSize: "28px" }}>
          AutoParts EU
        </h1>

        <input
          placeholder="Email"
          style={{
            width: "100%",
            height: "48px",
            marginBottom: "14px",
            padding: "0 12px",
            border: "1px solid #ddd"
          }}
        />

        <input
          placeholder="Пароль"
          type="password"
          style={{
            width: "100%",
            height: "48px",
            marginBottom: "18px",
            padding: "0 12px",
            border: "1px solid #ddd"
          }}
        />

        <button
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

        <p style={{ marginTop: "18px", color: "#666", fontSize: "14px" }}>
          Клиент → /dashboard  
          Админ → /admin  
          Поставщик → /supplier
        </p>
      </div>
    </main>
  );
}
