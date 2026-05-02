import Footer from "../../../../components/Footer";
import styles from "./request.module.css";

export default function AdminRequestPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a
            href="/admin/orders"
            className={styles.backBtn}
          >
            ← Все заявки
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
            ЗАЯВКА #1045
          </div>

          <h1>Карточка клиента</h1>

          <div className={styles.grid}>

            <div className={styles.card}>
              <h3>Клиент</h3>
              <p>Александр</p>

              <h3>Телефон</h3>
              <p>+7 700 000 0001</p>

              <h3>Email</h3>
              <p>alex@mail.com</p>
            </div>

            <div className={styles.card}>
              <h3>Запрос</h3>
              <p>
                Audi A6 / VIN:
                WAUZZZ4F...
              </p>

              <h3>Деталь</h3>
              <p>
                Тормозной диск
                передний
              </p>

              <h3>Комментарий</h3>
              <p>
                Нужна быстрая доставка
              </p>
            </div>

            <div className={styles.card}>
              <h3>CRM</h3>

              <label>
                Статус
              </label>

              <select>
                <option>
                  Новая
                </option>
                <option>
                  В работе
                </option>
                <option>
                  Цена готова
                </option>
                <option>
                  Оплачено
                </option>
                <option>
                  Отправлено
                </option>
              </select>

              <label>
                Цена €
              </label>

              <input
                placeholder="129"
              />

              <label>
                Комментарий
              </label>

              <textarea
                placeholder="Написать клиенту..."
              />

              <button>
                СОХРАНИТЬ
              </button>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}