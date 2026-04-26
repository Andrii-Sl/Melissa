"use client";

import { useEffect, useState } from "react";

const steps = [
  "Запрос",
  "Предложение",
  "Подтверждение",
  "Оплата",
  "Доставка"
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight;
      let index = Math.floor(window.scrollY / (h * 0.6));
      if (index > steps.length - 1) index = steps.length - 1;
      setActive(index);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ height: "200vh", background: "#000", color: "#fff" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>

        <h1>Как это работает</h1>

        <div style={{
          width: "200px",
          height: "4px",
          background: "#333",
          margin: "20px 0"
        }}>
          <div style={{
            width: `${((active + 1) / steps.length) * 100}%`,
            height: "100%",
            background: "#fff"
          }} />
        </div>

        {steps.map((s, i) => (
          <div key={i}
            style={{
              opacity: i <= active ? 1 : 0.3,
              transform: i === active ? "scale(1.2)" : "scale(1)",
              transition: "0.3s",
              margin: "10px"
            }}>
            {s}
          </div>
        ))}

      </div>
    </section>
  );
              }
