export default function Hero() {
  return (
    <section className="hero">
      <div className="left">
        <p className="badge">Оригинальные детали из Европы</p>

        <h1>
          Подбор автозапчастей
          <br />
          по VIN номеру
        </h1>

        <p className="sub">
          BMW • Audi • Mercedes • VW • Skoda
        </p>

        <input
          className="vin"
          placeholder="Введите VIN код автомобиля..."
        />

        <button className="cta">
          Подобрать детали
        </button>

        <div className="trust">
          <span>✔ Доставка в Казахстан</span>
          <span>✔ Гарантия</span>
          <span>✔ Быстрый ответ</span>
        </div>
      </div>

      <div className="right">
        <img src="/audi.jpg" alt="Audi" className="car" />
      </div>
    </section>
  );
}
