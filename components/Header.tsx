import Link from 'next/link'
export default function Header(){
 return <header className="header wrap">
  <div className="brand">AutoParts EU</div>
  <nav className="nav">
    <a href="#benefits">Преимущества</a>
    <a href="#steps">Как это работает</a>
    <a href="#contacts">Контакты</a>
  </nav>
  <Link href="/dashboard" className="btn ghost">Личный кабинет</Link>
 </header>
}
