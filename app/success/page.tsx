"use client";

import { useSearchParams } from "next/navigation";
import Footer from "../../components/Footer";
import styles from "./success.module.css";

export default function SuccessPage() {
  const params = useSearchParams();

  const id =
    params.get("id") || "";

  const message =
    `Здравствуйте, я отправил заявку №${id} на сайте AutoParts EU`;

  const waLink =
    "https://wa.me/77000000000?text=" +
    encodeURIComponent(message);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>
            <div className={styles.icon}>
              ✓
            </div>

            <div className={styles.label}>
              ЗАЯВКА ПРИНЯТА
            </div>

            <h1>
              Спасибо за обращение
            </h1>

            <p>
              Ваша заявка
              {" "}
              <strong>
                №{id}
              </strong>
              {" "}
              успешно создана.
            </p>

            <p>
              Менеджер свяжется
              с вами после
              обработки запроса.
            </p>

            <a
              href="/dashboard"
              className={styles.mainBtn}
            >
              Личный кабинет
            </a>

            <a
              href={waLink}
              target="_blank"
              className={styles.waBtn}
            >
              Написать в WhatsApp
            </a>

            <a
              href="/"
              className={styles.backLink}
            >
              Вернуться на главную
            </a>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}