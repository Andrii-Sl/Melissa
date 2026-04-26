"use client";

import { useEffect, useState } from "react";

export default function Cabinet() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Мои заказы</h1>

      {orders.map((o: any) => (
        <div key={o.id} style={{
          border: "1px solid #ccc",
          margin: "10px 0",
          padding: "10px"
        }}>
          VIN: {o.vin}<br />
          Статус: {o.status}
        </div>
      ))}
    </div>
  );
}
