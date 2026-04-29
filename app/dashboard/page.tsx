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
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>EU PARTS</h2>

        <p className="active">Мои заказы</p>
        <p>Подбор по VIN</p>
        <p>Автомобили</p>
        <p>Сообщения</p>
        <p>Профиль</p>
      </aside>

      {/* MAIN */}
      <main className="dashMain">

        <h1>Мои заказы</h1>

        {orders.map(o => (
          <div key={o.id} className="order">

            <div>
              <b>{o.name}</b>
              <p>{o.car}</p>
              <p>VIN: {o.vin}</p>
            </div>

            <div>
              {o.price && <p>€{o.price}</p>}
              <p>{o.status}</p>
            </div>

          </div>
        ))}

      </main>

      {/* RIGHT */}
      <aside className="profile">
        <h3>Профиль</h3>
        <p>Андрей</p>
        <p>Email</p>
      </aside>

    </div>
  );
}
