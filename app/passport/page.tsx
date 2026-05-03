import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./passport.module.css";

export const dynamic =
  "force-dynamic";

type Props = {
  searchParams: {
    vin?: string;
    phone?: string;
  };
};

export default function PassportPage({
  searchParams,
}: Props) {
  const vin =
    searchParams.vin || "";

  const phone =
    searchParams.phone || "";

  async function createLead(
    formData: FormData
  ) {
    "use server";

    const query =
      String(
        formData.get("query")
      ) || "";

    if (!query) return;

    await supabase
      .from("requests")
      .insert([
        {
          vin,
          phone,
          part_query: query,
          status: "new",
        },
      ]);
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <Link
          href="/"
          className={styles.logoWrap}
        >
          <img
            src="/logo-final.png"
            alt="logo"
            className={styles.logo}
          />

          <span>
            AutoParts EU
          </span>
        </Link>

        <Link
          href="/"
          className={styles.homeBtn}
        >
          На главную
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.grid}>

          <div className={styles.card}>

            <div className={styles.label}>
              ПАСПОРТ АВТО
            </div>

            <h1 className={styles.title}>
              Проверка VIN
            </h1>

            <div className={styles.info}>
              <p>
                <strong>VIN:</strong>{" "}
                {vin}
              </p>

              <p>
                <strong>Телефон:</strong>{" "}
                {phone}
              </p>
            </div>

          </div>

          <div className={styles.card}>

            <div className={styles.label}>
              ПОИСК ДЕТАЛИ
            </div>

            <h2 className={styles.sub}>
              TecDoc Search
            </h2>

            <form action={createLead}>

              <input
                name="query"
                className={styles.input}
                placeholder="Введите название детали"
              />

              <button
                className={styles.button}
                type="submit"
              >
                ИСКАТЬ
              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}