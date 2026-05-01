import "../panel.css";

export default function SupplierPage() {
  return (
    <main className="panelLayout">

      {/* Sidebar */}
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

      {/* Content */}
      <section className="content">

        <div className="topbar">
          <h1>Panel Dostawcy</h1>
          <div className="userBox">Dostawca</div>
        </div>

        {/* Stats */}
        <div className="stats">

          <div className="card">
            <h3>Nowe zamówienia</h3>
            <strong>9</strong>
          </div>

          <div className="card">
            <h3>W realizacji</h3>
            <strong>16</strong>
          </div>

          <div className="card">
            <h3>Wysłane</h3>
            <strong>28</strong>
          </div>

        </div>

        {/* Table */}
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
              <tr>
                <td>#3101</td>
                <td>Klocki hamulcowe BMW X5</td>
                <td><span className="badge">Nowe</span></td>
                <td>€160</td>
              </tr>

              <tr>
                <td>#3098</td>
                <td>Filtr Audi A6</td>
                <td><span className="badge">Wysłane</span></td>
                <td>€42</td>
              </tr>

              <tr>
                <td>#3092</td>
                <td>Amortyzator Mercedes</td>
                <td><span className="badge">Produkcja</span></td>
                <td>€215</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

    </main>
  );
              }
