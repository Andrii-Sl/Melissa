"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: "220px",
        background: "#f7f7f7",
        padding: "20px"
      }}>
        <h3>AutoParts</h3>

        <p style={{ color: "red" }}>Мои заказы</p>
        <p>Подбор по VIN</p>
        <p>Мои автомобили</p>
        <p>Сообщения</p>
        <p>Избранное</p>
        <p>Адреса доставки</p>
        <p>Профиль</p>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "20px" }}>

        <h1>Мои заказы</h1>

        {orders.map((o) => (
          <div key={o.id} style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #eee",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}>

            <div>
              <b>{o.name}</b>
              <p>{o.car}</p>
              <p>VIN: {o.vin}</p>
              <p>{o.brand}</p>
            </div>

            <div>
              {o.status === "pending" && (
                <>
                  <p>€{o.price}</p>
                  <button>Оплатить</button>
                </>
              )}

              {o.status === "processing" && (
                <p>В подборе...</p>
              )}

              {o.status === "done" && (
                <p>Доставлен</p>
              )}
            </div>

          </div>
        ))}

      </main>

      {/* RIGHT PANEL */}
      <aside style={{
        width: "250px",
        background: "#fafafa",
        padding: "20px"
      }}>
        <h3>Профиль</h3>

        <p>Андрей С.</p>
        <p>slynko.andrey@gmail.com</p>

        <hr />

        <h4>Мои автомобили</h4>
        <p>BMW X5 2019</p>
        <p>Audi A6 2016</p>
      </aside>

    </div>
  );
}
