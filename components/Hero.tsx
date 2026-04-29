import Image from 'next/image'
export default function Hero(){
 return <section className="hero wrap">
   <div>
    <p className="eyebrow">ПОИСК ПО VIN / OEM</p>
    <h1>Подбор автозапчастей из Европы</h1>
    <p className="lead">Оригинальные детали и качественные аналоги с доставкой.</p>
    <div className="panel">
      <input placeholder="Введите VIN или номер детали" />
      <textarea placeholder="Комментарий к запросу" />
      <button className="btn primary">Получить предложение</button>
    </div>
   </div>
   <div className="visual">
    <Image src="/audi.jpg" alt="Audi" fill className="cover"/>
   </div>
 </section>
}
