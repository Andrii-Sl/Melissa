const items=['Подбор по VIN','Поставки из Европы','Гарантия качества','Быстрая доставка']
export default function Benefits(){
 return <section id="benefits" className="wrap section grid4">{items.map(i=><div key={i} className="card"><h3>{i}</h3><p>Премиальный сервис для владельцев авто.</p></div>)}</section>
}
