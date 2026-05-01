import "../panel.css";
import LogoutButton from "@/components/LogoutButton";
import { orders } from "@/data/orders";

export default function AdminPage() {
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

          <div style={{ display:"flex", gap:"10px" }}>
            <div className="userBox">Владелец</div>
            <LogoutButton />
          </div>
        </div>

        <div className="stats">

          <div className="card">
            <h3>Всего заказов</h3>
            <strong>{orders.length}</strong>
          </div>

          <div className="card">
            <h3>Новых заявок</h3>
            <strong>
              {orders.filter(o => o.status === "Новая заявка").length}
            </strong>
          </div>

          <div className="card">
            <h3>В пути</h3>
            <strong>
              {orders.filter(o => o.status === "В пути").length}
            </strong>
          </div>

        </div>

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
                  <td>
                    <span className="badge">
                      {order.status}
                    </span>
                  </td>
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
