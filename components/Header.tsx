import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">AutoParts EU</div>

      <nav className="nav">
        <a href="#">Как это работает</a>
        <a href="#">Доставка</a>
        <a href="#">Контакты</a>
      </nav>

      <Link href="/dashboard" className="cabinetBtn">
        Личный кабинет
      </Link>
    </header>
  );
}
