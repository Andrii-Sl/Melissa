"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import styles from "../page.module.css";

export default function EnHomePage() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cabinetLink, setCabinetLink] =
    useState("/en/login");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    if (session) {
      setCabinetLink(
        "/dashboard"
      );
    } else {
      setCabinetLink(
        "/en/login"
      );
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <button
            className={styles.burger}
            onClick={() =>
              setMenuOpen(true)
            }
          >
            ☰
          </button>

          <a
            href="/en"
            className={styles.logoWrap}
          >
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a
            href={cabinetLink}
            className={styles.loginBtn}
          >
            Account
          </a>

        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className={styles.overlayMenu}
            onClick={() =>
              setMenuOpen(false)
            }
          />

          <aside className={styles.menu}>
            <button
              className={styles.closeBtn}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              ✕
            </button>

            <a href="/en/about">
              About Company
            </a>

            <a href="/en/how-it-works">
              How It Works
            </a>

            <a href="/en/schedule">
              Delivery Schedule
            </a>

            <a href="/en/contacts">
              Contacts
            </a>

            <a href="/">
              RU Version
            </a>
          </aside>
        </>
      )}

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <div className={styles.miniTitle}>
              VIN & PART NUMBER SEARCH
            </div>

            <h1>
              Auto Parts
              <br />
              from Europe
            </h1>

            <p>
              Genuine parts and
              quality aftermarket
              components for
              European cars.
            </p>

            <div className={styles.trustRow}>
              <span>
                ✔ VIN Search
              </span>

              <span>
                ✔ EU Suppliers
              </span>

              <span>
                ✔ Quality Guarantee
              </span>
            </div>

            <form
              action="/en/offer"
              className={styles.offerForm}
            >
              <input
                name="vin"
                placeholder="VIN or part number"
                required
                minLength={3}
              />

              <input
                name="phone"
                placeholder="Phone / WhatsApp"
                required
                minLength={6}
              />

              <button
                type="submit"
                className={styles.cta}
              >
                GET OFFER
              </button>
            </form>

            <div className={styles.paymentsBanner}>
              <img
                src="/payments-banner.png"
                alt="Payments"
                className={styles.paymentsImg}
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}