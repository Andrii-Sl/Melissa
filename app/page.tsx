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
            <button className={styles.burger}>
              ☰
            </button>

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
              Подбор автозапчастей
              <br />
              из Европы
            </h1>

            <p>
              Оригинальные и качественные аналоги
              для европейских автомобилей.
              Быстро, надежно, с гарантией.
            </p>

            <input placeholder="Введите VIN или номер детали" />
            <input placeholder="Опишите ваш запрос (необязательно)" />

            <button className={styles.cta}>
              ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
            </button>

            <div className={styles.socials}>
              <a href="#">WhatsApp</a>
              <a href="#">Telegram</a>
            </div>

          </div>

        </div>
      </section>

      {/* STEPS */}
      <section className={styles.steps}>
        <div className={styles.container}>
          <h2>КАК ЭТО РАБОТАЕТ</h2>

          <div className={styles.stepsGrid}>
            <div>1. Ваш запрос</div>
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
              <p>Проверенные поставщики</p>
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