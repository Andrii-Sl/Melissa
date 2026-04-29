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
    <div style={{ padding: 30 }}>
      <h1>Мои заказы</h1>

      {orders.map(o => (
        <div key={o.id} style={{
          border: "1px solid #ddd",
          padding: 15,
          marginBottom: 10
        }}>
          <b>{o.name}</b>
          <p>{o.car}</p>
          <p>{o.status}</p>
        </div>
      ))}
    </div>
  );
}
