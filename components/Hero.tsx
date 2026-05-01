export default function Hero() {
  return (
    <section className="hero">
      <div className="heroLeft">
        <p className="badge">Премиум маркетплейс Европы</p>

        <h1>
          Подбор автозапчастей
          <br />
          по VIN коду
        </h1>

        <p className="sub">
          BMW • Audi • Mercedes • VW • Skoda
        </p>

        <input placeholder="Введите VIN номер..." className="vinInput" />

        <button className="cta">Подобрать детали</button>
      </div>

      <div className="heroRight">
        <img src="/audi.jpg" alt="Audi" className="heroCar" />
      </div>
    </section>
  );
}
