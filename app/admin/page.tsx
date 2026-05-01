import "../panel.css";
import LogoutButton from "@/components/LogoutButton";

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
            <h3>Новых заявок</h3>
            <strong>14</strong>
          </div>

          <div className="card">
            <h3>Заказов в работе</h3>
            <strong>27</strong>
          </div>

          <div className="card">
            <h3>Прибыль месяц</h3>
            <strong>€4 320</strong>
          </div>

        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Клиент</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#2041</td>
                <td>Иванов</td>
                <td><span className="badge">Оплачен</span></td>
                <td>€380</td>
              </tr>

              <tr>
                <td>#2038</td>
                <td>Сергей</td>
                <td><span className="badge">В пути</span></td>
                <td>€210</td>
              </tr>

              <tr>
                <td>#2035</td>
                <td>Алихан</td>
                <td><span className="badge">Новая заявка</span></td>
                <td>€0</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

    </main>
  );
      }
