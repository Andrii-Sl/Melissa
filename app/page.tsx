export default function HomePage() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", background:"#fff" }}>

      {/* HEADER */}
      <header
        style={{
          height:"80px",
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          padding:"0 40px",
          borderBottom:"1px solid #eee"
        }}
      >
        <div style={{fontSize:"26px", fontWeight:"700"}}>
          AutoParts EU
        </div>

        <nav style={{display:"flex", gap:"30px"}}>
          <a href="#">Как это работает</a>
          <a href="#">Доставка</a>
          <a href="#">Контакты</a>
        </nav>

        <a
          href="/login"
          style={{
            border:"1px solid #111",
            padding:"12px 18px",
            textDecoration:"none",
            color:"#111"
          }}
        >
          Личный кабинет
        </a>
      </header>

      {/* HERO */}
      <section
        style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          minHeight:"calc(100vh - 80px)"
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background:"#111",
            color:"#fff",
            padding:"70px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
          }}
        >
          <h1
            style={{
              fontSize:"56px",
              lineHeight:"1.1",
              marginBottom:"20px"
            }}
          >
            Подбор автозапчастей из Европы
          </h1>

          <p style={{color:"#bbb", marginBottom:"26px"}}>
            Быстро. Надёжно. Доставка в Казахстан.
          </p>

          <input
            placeholder="Введите VIN номер"
            style={{
              height:"52px",
              marginBottom:"12px",
              padding:"0 14px",
              border:"none"
            }}
          />

          <input
            placeholder="Какая деталь нужна?"
            style={{
              height:"52px",
              marginBottom:"14px",
              padding:"0 14px",
              border:"none"
            }}
          />

          <button
            style={{
              height:"52px",
              background:"#fff",
              color:"#111
