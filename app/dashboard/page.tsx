import "../panel.css";

export default function DashboardPage() {
  return (
    <main className="panelLayout">

      {/* Sidebar */}
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

      {/* Content */}
      <section className="content">

        <div className="topbar">
          <h1>Личный кабинет</h1>
          <div className="userBox">Андрей</div>
        </div>

        {/* Stats */}
        <div className="stats">

          <div className="card">
            <h3>Активных заказов</h3>
            <strong>3</strong>
          </div>

          <div className="card">
            <h3>Доставлено</h3>
            <strong>12</strong>
          </div>

          <div className="card">
            <h3>Экономия</h3>
            <strong>€740</strong>
          </div>

        </div>

        {/* Orders */}
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Заказ</th>
                <th>Деталь</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#1024</td>
                <td>Тормозные колодки BMW X5</td>
                <td><span className="badge">В пути</span></td>
                <td>€180</td>
              </tr>

              <tr>
                <td>#1021</td>
                <td>Фильтр Audi A6</td>
                <td><span className="badge">Доставлен</span></td>
                <td>€45</td>
              </tr>

              <tr>
                <td>#1018</td>
                <td>Амортизатор Mercedes</td>
                <td><span className="badge">Обработка</span></td>
                <td>€220</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

    </main>
  );
          }
