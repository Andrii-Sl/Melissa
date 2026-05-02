import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import styles from "./schedule.module.css";

export default function SchedulePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <Menu />

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
              Поставки заказов
              <br />
              из Европы
            </h1>

            <p>
              Актуальная схема работы,
              логистика и сроки доставки
              по Казахстану.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.card}>
            <h2>Казахстан — все города</h2>

            <p>
              Доставка осуществляется
              на таможенно-лицензионный
              склад в Алматы, далее
              курьерской службой
              на любой адрес страны.
            </p>
          </div>

          <div className={styles.card}>
            <h2>График поставок</h2>

            <div className={styles.timeline}>

              <div className={styles.step}>
                <span>1</span>

                <div>
                  <strong>
                    Четверг – Четверг
                  </strong>

                  <p>
                    Открыт пул заказов
                    на текущую отправку.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <span>2</span>

                <div>
                  <strong>
                    Четверг
                  </strong>

                  <p>
                    Оплаченные заказы
                    комплектуются,
                    проходят оформление
                    и отправляются
                    в Казахстан.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <span>3</span>

                <div>
                  <strong>
                    Среда следующей недели
                  </strong>

                  <p>
                    После таможенной очистки
                    отправляем курьером
                    по всей территории
                    Казахстана.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className={styles.card}>
            <h2>Сроки доставки</h2>

            <p>
              Средний срок поставки —
              <strong> 7 дней </strong>
              с момента отгрузки
              со склада в Польше.
            </p>

            <p>
              Позиции, отсутствующие
              на складе,
              согласовываются
              индивидуально.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}