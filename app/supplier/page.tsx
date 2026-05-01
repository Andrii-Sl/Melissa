import "../panel.css";
import LogoutButton from "@/components/LogoutButton";
import { orders } from "@/data/orders";

export default function SupplierPage() {
  const supplierOrders = orders;

  return (
    <main className="panelLayout">

      <aside className="sidebar">
        <div className="brand">AutoParts EU</div>

        <nav className="menu">
          <a className="active">Zamówienia</a>
          <a>Nowe zapytania</a>
          <a>Produkty</a>
          <a>Wysyłka</a>
          <a>Faktury</a>
          <a>Wiadomości</a>
          <a>Ustawienia</a>
        </nav>
      </aside>

      <section className="content">

        <div className="topbar">
          <h1>Panel Dostawcy</h1>

          <div style={{display:"flex", gap:"10px"}}>
            <div className="userBox">Dostawca</div>
            <LogoutButton />
          </div>
        </div>

        <div className="stats">

          <div className="card">
            <h3>Wszystkie zamówienia</h3>
            <strong>{supplierOrders.length}</strong>
          </div>

          <div className="card">
            <h3>Nowe</h3>
            <strong>
              {supplierOrders.filter(
                o => o.status === "Новая заявка"
              ).length}
            </strong>
          </div>

          <div className="card">
            <h3>W realizacji</h3>
            <strong>
              {supplierOrders.filter(
                o => o.status === "В пути"
              ).length}
            </strong>
          </div>

        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Nr</th>
                <th>Produkt</th>
                <th>Status</th>
                <th>Kwota</th>
              </tr>
            </thead>

            <tbody>
              {supplierOrders.map((order) => (
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
