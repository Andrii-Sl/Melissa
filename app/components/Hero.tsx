"use client";

import VinForm from "./VinForm";

export default function Hero() {
  return (
    <section style={{
      height: "100vh",
      backgroundImage: "url('/audi.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center"
    }}>

      <div style={{
        background: "rgba(0,0,0,0.6)",
        padding: "30px",
        borderRadius: "10px"
      }}>
        <h1>Поставка автозапчастей из Европы</h1>
        <p>Подбор по VIN или номеру детали</p>

        <VinForm />
      </div>

    </section>
  );
      }
