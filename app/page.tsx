import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.container}>

          <Link href="/" className={styles.logoWrap}>
            <Image
              src="/logo.svg"
              alt="AutoParts EU"
              width={240}
              height={70}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <a href="#">О компании</a>
            <a href="#">Как это работает</a>
            <a href="#">Гарантия</a>
            <a href="#">Доставка</a>
            <a href="#">Контакты</a>
          </nav>

          <div className={styles.rightSide}>
            <button className={styles.burger}>☰</button>

            <Link href="/login" className={styles.loginBtn}>
              Личный кабинет
            </Link>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.heroBox}>

            <div className={styles.miniTitle}>
              ПОДБОР ПО VIN ИЛИ НОМЕРУ ДЕТАЛИ
            </div>

            <h1>
              Автозапчасти из Европы
              <br />
              с гарантией
            </h1>

            <p>
              Оригинальные и качественные аналоги
              для Audi, BMW, Mercedes, Volkswagen
              и других марок.
            </p>

            <div className={styles.trustRow}>
              <span>✔ Ответ за 15 минут</span>
              <span>✔ Доставка 7–14 дней</span>
              <span>✔ Фото перед отправкой</span>
            </div>

            <input placeholder="Введите VIN или номер детали" />
            <input placeholder="Телефон / WhatsApp" />

            <button className={styles.cta}>
              УЗНАТЬ ЦЕНУ ЗА 15 МИНУТ
            </button>

            <div className={styles.socials}>
              <a href="#">WhatsApp</a>
              <a href="#">Telegram</a>
            </div>

          </div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className={styles.stats}>
        <div className={styles.container}>

          <div className={styles.statsGrid}>

            <div>
              <strong>500+</strong>
              <span>довольных клиентов</span>
            </div>

            <div>
              <strong>1200+</strong>
              <span>успешных заказов</span>
            </div>

            <div>
              <strong>4.9★</strong>
              <span>рейтинг сервиса</span>
            </div>

          </div>

        </div>
      </section>

      {/* HOW */}
      <section className={styles.steps}>
        <div className={styles.container}>

          <h2>КАК ЭТО РАБОТАЕТ</h2>

          <div className={styles.stepsGrid}>
            <div>1. Заявка</div>
            <div>2. Подбор</div>
            <div>3. Предложение</div>
            <div>4. Оплата</div>
            <div>5. Доставка</div>
            <div>6. Получение</div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className={styles.container}>

          <div className={styles.featuresGrid}>

            <div>
              <h3>Подбор по VIN</h3>
              <p>Точность подбора до 98%</p>
            </div>

            <div>
              <h3>Поставки из Европы</h3>
              <p>Работаем с проверенными поставщиками</p>
            </div>

            <div>
              <h3>Гарантия качества</h3>
              <p>Проверка перед отправкой</p>
            </div>

            <div>
              <h3>Регулярная доставка</h3>
              <p>Быстро в Казахстан</p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
        }
