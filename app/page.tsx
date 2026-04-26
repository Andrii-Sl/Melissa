import HowItWorks from "./components/HowItWorks";

export default function Page() {
  return (
    <main>

      {/* 🔥 Главный экран */}
      <section style={{
        height: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "32px" }}>
          Поставка автозапчастей из Европы
        </h1>

        <p style={{ marginTop: "10px", opacity: 0.7 }}>
          Подбор по VIN. Прямые поставки. Прозрачные условия.
        </p>

        <button style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#7a1f1f",
          color: "#fff",
          border: "none",
          borderRadius: "6px"
        }}>
          Получить предложение
        </button>
      </section>

      {/* 🔽 Блок "Как это работает" */}
      <HowItWorks />

    </main>
  );
      }
