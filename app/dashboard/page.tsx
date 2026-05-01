import "./dashboard.css";

export default function DashboardPage() {
  return (
    <main className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">AutoParts EU</div>

        <nav>
          <a className="active">Мои заказы</a>
          <a>Подбор по VIN</a>
          <a>Мои автомобили</a>
          <a>Сообщения</a>
          <a>Избранное</a>
          <a>Профиль</a>
        </nav>
      </aside>

      {/* Content */}
      <section className="content">
        <div className="topbar">
          <h1>Личный кабинет</h1>
          <button>Новый запрос</button>
        </div>

        <div className="cards">
          <div className="card">
            <span>Активных заказов</span>
            <strong>3</strong>
          </div>

          <div className="card">
            <span>Доставлено</span>
            <strong>12</strong>
          </div>

          <div className="card">
            <span>Сэкономлено</span>
            <strong>€740</strong>
          </div>
        </div>

        <div className="orders">
          <h2>Последние заказы</h2>

          <div className="order">
            <div>
              <strong>Тормозные колодки BMW X5</strong>
              <p>Заказ #1024</p>
            </div>

            <span className="status progress">В пути</span>
          </div>

          <div className="order">
            <div>
              <strong>Фильтр Audi A6</strong>
              <p>Заказ #1021</p>
            </div>

            <span className="status done">Доставлен</span>
          </div>

          <div className="order">
            <div>
              <strong>Амортизатор Mercedes</strong>
              <p>Заказ #1018</p>
            </div>

            <span className="status pending">В обработке</span>
          </div>
        </div>
      </section>

      {/* Right Panel */}
      <aside className="profile">
        <div className="user">
          <h3>Андрей</h3>
          <p>Клиент с 2026</p>
        </div>

        <div className="box">
          <h4>Мои авто</h4>
          <p>Audi A6</p>
          <p>BMW X5</p>
        </div>

        <div className="box">
          <h4>Поддержка</h4>
          <p>WhatsApp</p>
          <p>Telegram</p>
        </div>
      </aside>
    </main>
  );
            }
