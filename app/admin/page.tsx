import Link from 'next/link'

export default function AdminPage(){
  return (
    <main className="adminWrap">
      <aside className="adminSide">
        <h2>Admin Panel</h2>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/dashboard">Client Area</Link>
      </aside>

      <section className="adminMain">
        <h1>Управление проектом</h1>

        <div className="adminStats">
          <div className="box"><strong>124</strong><span>Всего заказов</span></div>
          <div className="box"><strong>18</strong><span>Новые заявки</span></div>
          <div className="box"><strong>€12 480</strong><span>Оборот</span></div>
          <div className="box"><strong>7</strong><span>Ожидают оплаты</span></div>
        </div>

        <div className="adminGrid">
          <div className="panel">
            <h3>Последние действия</h3>
            <p>Новый заказ #10234</p>
            <p>Оплата #10210 подтверждена</p>
            <p>Новый пользователь зарегистрирован</p>
          </div>

          <div className="panel">
            <h3>Быстрые действия</h3>
            <button>Добавить заказ</button>
            <button>Создать клиента</button>
            <button>Экспорт CSV</button>
          </div>
        </div>
      </section>
    </main>
  )
}
