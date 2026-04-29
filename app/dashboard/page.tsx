const orders=[
 {id:'10234',name:'Передняя фара правая',car:'VW Passat B8',price:'€320',status:'Ожидает оплаты'},
 {id:'10210',name:'Тормозные диски',car:'BMW X5 G05',price:'€540',status:'В подборе'},
 {id:'10190',name:'Турбина',car:'Audi A6 C7',price:'€850',status:'Доставлен'}
]

export default function Dashboard(){
 return <main className="dashWrap">
  <aside className="sidebar">
   <h3>AutoParts EU</h3>
   <a className="active">Мои заказы</a>
   <a>Подбор по VIN</a>
   <a>Автомобили</a>
   <a>Сообщения</a>
   <a>Профиль</a>
  </aside>

  <section className="dashMain">
   <div className="dashTop">
    <h1>Личный кабинет</h1>
    <button>Новый запрос</button>
   </div>

   <div className="statsGrid">
    <div className="stat"><strong>12</strong><span>Всего заказов</span></div>
    <div className="stat"><strong>3</strong><span>В работе</span></div>
    <div className="stat"><strong>2</strong><span>Ожидают оплаты</span></div>
    <div className="stat"><strong>7</strong><span>Завершено</span></div>
   </div>

   <h2>Мои заказы</h2>
   {orders.map(o=><div className="orderCard" key={o.id}>
    <div>
      <small>Заказ #{o.id}</small>
      <h3>{o.name}</h3>
      <p>{o.car}</p>
    </div>
    <div className="right">
      <span>{o.status}</span>
      <strong>{o.price}</strong>
      <button>Подробнее</button>
    </div>
   </div>)}
  </section>
 </main>
   }
