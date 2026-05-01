"use client";

import "../panel.css";
import LogoutButton from "@/components/LogoutButton";
import { orders } from "@/data/orders";
import {
  leads,
  updateLeadStatus
} from "@/data/leads";

export default function AdminPage() {

  function changeStatus(id: number, status: string) {
    updateLeadStatus(id, status);
    location.reload();
  }

  return (
    <main className="panelLayout">

      <aside className="sidebar">
        <div className="brand">AutoParts EU</div>

        <nav className="menu">
          <a className="active">Все заказы</a>
          <a>Новые заявки</a>
          <a>Клиенты</a>
          <a>Поставщики</a>
          <a>Финансы</a>
          <a>Сообщения</a>
          <a>Настройки</a>
        </nav>
      </aside>

      <section className="content">

        <div className="topbar">
          <h1>Админ кабинет</h1>

          <div style={{display:"flex", gap:"10px"}}>
            <div className="userBox">Владелец</div>
            <LogoutButton />
          </div>
        </div>

        {/* Заявки */}
        <div className="tableWrap" style={{marginBottom:"24px"}}>
          <table>
            <thead>
              <tr>
                <th>VIN</th>
                <th>Деталь</th>
                <th>Телефон</th>
                <th>Статус</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.vin}</td>
                  <td>{lead.part}</td>
                  <td>{lead.phone}</td>

                  <td>
                    <select
                      value={lead.status}
                      onChange={(e)=>
                        changeStatus(
                          lead.id,
                          e.target.value
                        )
                      }
                    >
                      <option>Новая</option>
                      <option>В работе</option>
                      <option>Отправлено поставщику</option>
                      <option>Закрыта</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Заказы */}
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Клиент</th>
                <th>Товар</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.client}</td>
                  <td>{order.item}</td>
                  <td>{order.status}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </section>

    </main>
  );
}
