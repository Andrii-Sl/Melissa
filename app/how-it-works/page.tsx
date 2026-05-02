import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import styles from "./how.module.css";

export default function HowItWorksPage() {
  const steps = [
    {
      n: "01",
      title: "Отправьте запрос",
      text: "Введите VIN, номер детали или описание нужной запчасти."
    },
    {
      n: "02",
      title: "Подбор вариантов",
      text: "Мы находим оригинальные детали и качественные аналоги."
    },
    {
      n: "03",
      title: "Получите предложение",
      text: "Отправляем цену, сроки поставки и доступные варианты."
    },
    {
      n: "04",
      title: "Подтверждение заказа",
      text: "После согласования резервируем товар у поставщика."
    },
    {
      n: "05",
      title: "Оплата",
      text: "Безопасная оплата банковской картой или PayPal."
    },
    {
      n: "06",
      title: "Доставка",
      text: "Отправляем заказ и предоставляем статус движения."
    }
  ];

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
              КАК ЭТО РАБОТАЕТ
            </div>

            <h1>
              Простой процесс
              <br />
              заказа