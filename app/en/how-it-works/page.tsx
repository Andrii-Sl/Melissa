import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "../../how-it-works/how.module.css";

export default function EnHowItWorksPage() {
  const steps = [
    {
      n: "01",
      title: "Send request",
      text: "Enter VIN, part number or description."
    },
    {
      n: "02",
      title: "Selection",
      text: "We find original and alternative parts."
    },
    {
      n: "03",
      title: "Offer",
      text: "You receive price and delivery time."
    },
    {
      n: "04",
      title: "Confirmation",
      text: "We reserve the item after approval."
    },
    {
      n: "05",
      title: "Payment",
      text: "Secure payment by card or PayPal."
    },
    {
      n: "06",
      title: "Delivery",
      text: "We ship and provide tracking."
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
              Simple ordering
              <br />
              process
            </h1>

            <p>
              From request to delivery —
              clear and transparent.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {steps.map((item) => (
              <div key={item.n} className={styles.card}>
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