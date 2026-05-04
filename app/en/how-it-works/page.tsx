import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import styles from "../../how-it-works/how.module.css";

export default function EnHowItWorksPage() {
  const steps = [
    {
      n: "01",
      title: "Send request",
      text: "Enter VIN, part number, or describe the required auto part."
    },
    {
      n: "02",
      title: "Parts selection",
      text: "We find original parts and high-quality alternatives."
    },
    {
      n: "03",
      title: "Get an offer",
      text: "We provide pricing, delivery time, and available options."
    },
    {
      n: "04",
      title: "Order confirmation",
      text: "After approval, we reserve the item with the supplier."
    },
    {
      n: "05",
      title: "Payment",
      text: "Secure payment via bank card or PayPal."
    },
    {
      n: "06",
      title: "Delivery",
      text: "We ship your order and provide tracking updates."
    }
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Menu />

          <a href="/en" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a href="/dashboard" className={styles.loginBtn}>
            Account
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>
            <div className={styles.label}>
              HOW IT WORKS
            </div>

            <h1>
              Simple process
              <br />
              of ordering parts
            </h1>

            <p>
              From request to delivery —
              a transparent and clear journey
              for every customer.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {steps.map((item) => (
              <div
                key={item.n}
                className={styles.card}
              >
                <div className={styles.num}>
                  {item.n}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}