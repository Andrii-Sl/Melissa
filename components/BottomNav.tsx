"use client";

import Link from "next/link";

import {
  Home,
  FileText,
  MessageCircle,
  ShoppingBag,
  User,
} from "lucide-react";

import styles from "./BottomNav.module.css";

export default function BottomNav({
  active,
}:{
  active:string;
}) {

  return (

    <nav className={styles.bottomNav}>

      <Link
        href="/dashboard"
        className={`${styles.navItem} ${
          active === "home"
            ? styles.navItemActive
            : ""
        }`}
      >

        <Home
          size={22}
          strokeWidth={2.3}
        />

      </Link>

      <Link
        href="/dashboard/requests"
        className={`${styles.navItem} ${
          active === "requests"
            ? styles.navItemActive
            : ""
        }`}
      >

        <FileText
          size={22}
          strokeWidth={2.3}
        />

      </Link>

      <Link
        href="/dashboard/offers"
        className={`${styles.navItem} ${
          active === "offers"
            ? styles.navItemActive
            : ""
        }`}
      >

        <MessageCircle
          size={22}
          strokeWidth={2.3}
        />

      </Link>

      <Link
        href="/dashboard/orders"
        className={`${styles.navItem} ${
          active === "orders"
            ? styles.navItemActive
            : ""
        }`}
      >

        <ShoppingBag
          size={22}
          strokeWidth={2.3}
        />

      </Link>

      <Link
        href="/dashboard/profile"
        className={`${styles.navItem} ${
          active === "profile"
            ? styles.navItemActive
            : ""
        }`}
      >

        <User
          size={22}
          strokeWidth={2.3}
        />

      </Link>

    </nav>
  );
}