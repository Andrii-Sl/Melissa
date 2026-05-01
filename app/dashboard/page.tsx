import "../panel.css";
import LogoutButton from "@/components/LogoutButton";
import { orders } from "@/data/orders";

export default function DashboardPage() {
  const myOrders = orders.filter(
    (order) =>
      order.client === "Иванов" ||
      order.client === "Сергей"
  );

  return (
    <main className="panelLayout">

      <aside className="sidebar">
        <div className="brand">AutoParts EU</div>

        <nav className="menu">
          <a className="active">Мои заказы</a>
          <a>Новый запрос</a>
          <a>Мои автомобили</a>
          <a>Сообщения</a>
          <a>Документы</a>
          <a>Профиль</a>
        </nav>
      </aside>

      <section className="content">

        <div className="topbar">
          <h1>Личный кабинет</h1>

          <div style={{display:"flex", gap:"10px"}}>
            <div className="userBox">Андрей</div>
            <LogoutButton />
          </div>
        </div>

        <div className="stats">

          <div className="card">
            <h3>Мои заказы</h3>
            <strong>{myOrders.length}</strong>
          </div>

          <div className="card">
            <h3>В пути</h3>
            <strong>
              {myOrders.filter(
                o => o.status === "В пути"
              ).length}
            </strong>
          </div>

          <div className="card">
            <h3>Доставлено</h3>
            <strong>
              {myOrders.filter(
                o => o.status === "Оплачен"
              ).length}
            </strong>
          </div>

        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Товар</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
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
