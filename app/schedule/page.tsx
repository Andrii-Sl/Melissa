import styles from "./schedule.module.css";

export default function SchedulePage() {
  const rows = [
    {
      country: "Германия",
      day: "Среда",
      eta: "7–10 дней"
    },
    {
      country: "Польша",
      day: "Понедельник / Четверг",
      eta: "5–8 дней"
    },
    {
      country: "Литва",
      day: "Пятница",
      eta: "4–7 дней"
    },
    {
      country: "Нидерланды",
      day: "По запросу",
      eta: "7–12 дней"
    },
    {
      country: "Италия",
      day: "Вторник",
      eta: "8–12 дней"
    },
    {
      country: "Франция",
      day: "По запросу",
      eta: "8–14 дней"
    }
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <button className={styles.burger}>
            ☰
          </button>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a
            href="/dashboard"
            className={styles.loginBtn}
          >
            Кабинет
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>
            <div className={styles.label}>
              РАСПИСАНИЕ ПОСТАВОК
            </div>

            <h1>
              График поступления
              <br />
              заказов из Европы
            </h1>

            <p>
              Актуальные направления поставок
              и средние сроки доставки.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.table}>
            {rows.map((item) => (
              <div
                key={item.country}
                className={styles.row}
              >
                <div>{item.country}</div>
                <div>{item.day}</div>
                <div>{item.eta}</div>
              </div>
            ))}
          </div>

          <div className={styles.note}>
            Средний срок доставки зависит от
            бренда, наличия и типа товара.
          </div>

        </div>
      </section>
    </main>
  );
}