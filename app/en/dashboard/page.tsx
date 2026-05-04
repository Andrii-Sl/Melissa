"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../../dashboard/dashboard.module.css";

export default function EnDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/en/login";
      return;
    }

    const currentUser = session.user;
    setUser(currentUser);

    /* PROFILE */

    const { data: p } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    setProfile(p);

    /* REQUESTS */

    const { data: r } = await supabase
      .from("requests")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("id", { ascending: false });

    setOrders(r || []);

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/en";
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.wrap}>
          Loading...
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.wrap}>

        <div className={styles.top}>

          <div>
            <div className={styles.label}>
              ACCOUNT
            </div>

            <h1 className={styles.title}>
              {profile?.full_name || "Client"}
            </h1>

            <p className={styles.phone}>
              {profile?.phone || user?.phone || ""}
            </p>
          </div>

          <button
            onClick={logout}
            className={styles.logout}
          >
            Logout
          </button>

        </div>

        <div className={styles.list}>

          {orders.map((item) => (
            <a
              key={item.id}
              href={`/dashboard/request/${item.id}`}
              className={styles.card}
            >
              <strong>
                Request #{item.id}
              </strong>

              <p>
                {item.part_name ||
                  item.vin ||
                  "Request"}
              </p>

              <span>
                {translateStatus(item.status)}
              </span>
            </a>
          ))}

          {orders.length === 0 && (
            <div className={styles.empty}>
              No requests yet
            </div>
          )}

        </div>

      </section>
    </main>
  );
}

/* 🔥 статус перевод */

function translateStatus(status: string) {
  switch (status) {
    case "new":
      return "🟡 Processing";
    case "found":
      return "🟢 Found";
    case "waiting_payment":
      return "🔵 Waiting for payment";
    case "in_transit":
      return "🟣 In transit";
    case "done":
      return "✅ Delivered";
    default:
      return status;
  }
}