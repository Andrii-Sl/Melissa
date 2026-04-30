import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      padding:"20px 40px",
      borderBottom:"1px solid #eee"
    }}>
      <h2>AutoParts EU</h2>

      <nav style={{display:"flex",gap:"20px"}}>
        <a href="#">О компании</a>
        <a href="#">Доставка</a>
        <a href="#">Контакты</a>
      </nav>

      <Link href="/dashboard">Кабинет</Link>
    </header>
  );
}
