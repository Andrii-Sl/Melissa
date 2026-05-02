import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">

      <div className="logo">
        <Image
          src="/logo.png"
          alt="AutoParts EU"
          width={260}
          height={60}
          priority
        />
      </div>

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