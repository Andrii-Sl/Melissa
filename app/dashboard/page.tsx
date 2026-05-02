import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <div className={styles.rightSide}>
            <button className={styles.burger}>☰</button>

            <a href="/" className={styles.homeBtn}>
              На главную
            </a>
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.topBlock}>
            <div>
              <div className={styles.label}>
                ЛИЧНЫЙ КАБИНЕТ
              </div>

              <h1>Здравствуйте, Клиент</h1>

              <p>
                Управляйте запросами и отслеживайте
                статусы заказов.
              </p>
            </div>

            <a href="/offer" className={styles.newBtn}>
              + Новый запрос
            </a>
          </div>

          <div className={styles.grid}>

            <div className={styles.card}>
              <div className={styles.cardTitle}>
                Мои заявки
              </div>

              <div className={styles.request}>
                <strong>#1045</strong>
                <span>Audi A6 — тормозной диск</span>
                <small>Статус: В обработке</small>
              </div>

              <div className={styles.request}>
                <strong>#1046</strong>
                <span>BMW X5 — фильтр масла</span>
                <small>Статус: Ожидает цену</small>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>
                История заказов
              </div>

              <div className={styles.statRow}>
                Выполнено заказов: 12
              </div>

              <div className={styles.statRow}>
                Последний заказ: 14.05.2026
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>
                Профиль
              </div>

              <div className={styles.statRow}>
                Email: client@mail.com
              </div>

              <div className={styles.statRow}>
                Телефон: +49 000 0000
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}