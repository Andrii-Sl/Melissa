"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  name: string;
  car: string;
  vin: string;
  brand: string;
  price?: number;
  status: "pending" | "processing" | "done";
  days?: string;
};

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const pay = async (amount: number) => {
    const res = await fetch("/api/pay", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">AutoParts</h2>

        <nav>
          <p className="active">Мои заказы</p>
          <p>Подбор по VIN</p>
          <p>Мои автомобили</p>
          <p>Сообщения</p>
          <p>Избранное</p>
          <p>Адреса доставки</p>
          <p>Профиль</p>
          <p>Наст
