import "../panel.css";

export default function CheckoutPage() {
  return (
    <main className="panelLayout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">AutoParts EU</div>

        <nav className="menu">
          <a className="active">Оформление</a>
          <a>Мои заказы</a>
          <a>Поддержка</a>
        </nav>
      </aside>

      {/* Content */}
      <section className="content">

        <div className="topbar">
          <h1>Оформление заказа</h1>
          <div className="userBox">Клиент</div>
        </div>

        {/* Form */}
        <div className="stats" style={{gridTemplateColumns:"1fr 1fr"}}>
          
          <div className="card">
            <h3>Данные получателя</h3>

            <input
              placeholder="Имя"
              style={{
                width:"100%",
                height:"44px",
                marginBottom:"10px",
                border:"1px solid #ddd",
                padding:"0 10px"
              }}
            />

            <input
              placeholder="Телефон"
              style={{
                width:"100%",
                height:"44px",
                marginBottom:"10px",
                border:"1px solid #ddd",
                padding:"0 10px"
              }}
            />

            <input
              placeholder="Город"
              style={{
                width:"100%",
                height:"44px",
                border:"1px solid #ddd",
                padding:"0 10px"
              }}
            />
          </div>

          <div className="card">
            <h3>Ваш заказ</h3>

            <p style={{marginBottom:"10px"}}>
              Тормозные колодки BMW X5
            </p>

            <p style={{marginBottom:"10px"}}>
              Доставка: €25
            </p>

            <p style={{fontWeight:"700", marginBottom:"20px"}}>
              Итого: €205
            </p>

            <button
              style={{
                width:"100%",
                height:"46px",
                background:"#111",
                color:"#fff",
                border:"none",
                cursor:"pointer"
              }}
            >
              Перейти к оплате
            </button>
          </div>

        </div>

      </section>

    </main>
  );
              }
