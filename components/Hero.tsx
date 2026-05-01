export default function Hero() {
  return (
    <section className="hero">
      <div className="heroLeft">
        <h1>Подбор автозапчастей из Европы</h1>

        <p>
          Быстро. Надёжно. Доставка в Казахстан.
        </p>

        <input placeholder="Введите VIN номер" />
        <input placeholder="Какая деталь нужна?" />

        <button>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</button>

        <div className="messengers">
          <span>WhatsApp</span>
          <span>Telegram</span>
        </div>
      </div>

      <div className="heroRight">
        <img src="/audi.jpg" alt="Audi" />
      </div>
    </section>
  );
}
