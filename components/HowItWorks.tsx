const steps=['Отправьте VIN','Получите варианты','Оплатите заказ','Получите доставку']
export default function HowItWorks(){
 return <section id="steps" className="wrap section"><h2>Как это работает</h2><div className="grid4">{steps.map((s,n)=><div key={s} className="card"><span className="num">0{n+1}</span><h3>{s}</h3></div>)}</div></section>
}
