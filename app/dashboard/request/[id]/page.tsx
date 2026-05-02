import Footer from "../../../../components/Footer";
import styles from "./request.module.css";

export default function RequestDetailsPage() {
  const currentStep = 2;

  const steps = [
    "Новый",
    "Подбор",
    "Цена готова",
    "Оплачен",
    "Отправлен"
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a
            href="/dashboard"
            className={styles.backBtn}
          >
            ← Назад
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

          <div className={styles.grid}>

            <div className={styles.photoWrap}>
              <img
                src="/part.jpg"
                alt="Деталь"
                className={styles.photo}
              />
            </div>

            <div className={styles.info}>

              <h1>
                Тормозной диск передний
              </h1>

              <div className={styles.status}>
                Статус: Цена готова
              </div>

              <div className={styles.tracker}>
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className={
                      index <= currentStep
                        ? styles.stepActive
                        : styles.step
                    }
                  >
                    <span></span>
                    {step}
                  </div>
                ))}
              </div>

              <div className={styles.row}>
                Цена: 129 €
              </div>

              <div className={styles.row}>
                Наличие: Есть
              </div>

              <div className={styles.row}>
                Доставка: 7–10 дней
              </div>

              <div className={styles.row}>
                Менеджер: Готово к оплате
              </div>

              <button className={styles.payBtn}>
                ОПЛАТИТЬ
              </button>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}