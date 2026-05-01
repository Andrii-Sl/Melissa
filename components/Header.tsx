import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="logoWrap">
        <img src="/logo.png" alt="logo" className="logo" />
        <span>AutoParts EU</span>
      </div>

      <nav>
        <Link href="/">Главная</Link>
        <Link href="/dashboard">Кабинет</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
