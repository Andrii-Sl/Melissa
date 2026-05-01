import "../panel.css";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
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

          <div style={{ display:"flex", gap:"10px" }}>
            <div className="userBox">Андрей</div>
            <LogoutButton />
          </div>
        </div>

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
                <td
