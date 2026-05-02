import Footer from "../../../components/Footer";
import styles from "./dashboard.module.css";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Новые заявки",
      value: "12"
    },
    {
      title: "В работе",
      value: "8"
    },
    {
      title: "Ожидают оплату",
      value: "5"
    },
    {
      title: "Отправлено",
      value: "14"
    }
  ];

  const orders = [
    {
      id: 1045,
      client: "Александр",
      part: "Audi A6 тормозной диск",
      status: "Новая"
    },
    {
      id: 1046,
      client: "Руслан",
      part: "BMW X5 фильтр",
      status: "В работе"
    },
    {
      id: 1047,
      client: "Игорь",
      part: "Mercedes амортизатор",
      status: "Цена готова"
    }
  ];

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

          <a
            href="/admin"
            className={styles.exitBtn}
          >
            Выход
          </a>

        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ADMIN CRM
          </div>

          <h1>Панель управления</h1>

          <div className={styles.stats}>
            {stats.map((item) => (
              <div
                key={item.title}
                className={styles.statCard}
              >
                <span>{item.title}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className={styles.topRow}>
            <h2>Последние заявки</h2>

            <a href="/admin/orders">
              Все заявки →
            </a>
          </div>

          <div className={styles.orders}>
            {orders.map((item) => (
              <a
                key={item.id}
                href={`/admin/request/${item.id}`}
                className={styles.order}
              >
                <div>
                  <strong>
                    #{item.id}
                  </strong>

                  <p>{item.client}</p>
                </div>

                <div>
                  <p>{item.part}</p>

                  <span>
                    {item.status}
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}