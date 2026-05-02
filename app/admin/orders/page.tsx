import Footer from "../../../components/Footer";
import styles from "./orders.module.css";

export default function AdminOrdersPage() {
  const orders = [
    {
      id: 1045,
      client: "Александр",
      phone: "+7 700 000 0001",
      part: "Audi A6 тормозной диск",
      status: "Новая"
    },
    {
      id: 1046,
      client: "Руслан",
      phone: "+7 700 000 0002",
      part: "BMW X5 фильтр",
      status: "В работе"
    },
    {
      id: 1047,
      client: "Игорь",
      phone: "+7 700 000 0003",
      part: "Mercedes амортизатор",
      status: "Цена готова"
    },
    {
      id: 1048,
      client: "Данияр",
      phone: "+7 700 000 0004",
      part: "VW Passat рычаг",
      status: "Отправлено"
    }
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a
            href="/admin/dashboard"
            className={styles.backBtn}
          >
            ← Dashboard
          </a>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ADMIN CRM
          </div>

          <h1>Все заявки</h1>

          <div className={styles.list}>
            {orders.map((item) => (
              <a
                key={item.id}
                href={`/admin/request/${item.id}`}
                className={styles.card}
              >
                <div className={styles.top}>
                  <strong>
                    #{item.id}
                  </strong>

                  <span>
                    {item.status}
                  </span>
                </div>

                <p>
                  {item.client}
                </p>

                <p>
                  {item.phone}
                </p>

                <p>
                  {item.part}
                </p>
              </a>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}