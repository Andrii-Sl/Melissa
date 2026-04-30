const orders=[
{id:'10234',client:'Maxim',item:'Фара Audi A6',price:'€320',status:'pending'},
{id:'10210',client:'Andrei',item:'Диски BMW X5',price:'€540',status:'paid'},
{id:'10190',client:'Igor',item:'Турбина Passat',price:'€850',status:'done'}
]

export default function AdminOrders(){
 return <main className="adminTableWrap">
  <h1>Заказы</h1>
  <table className="adminTable">
   <thead><tr><th>ID</th><th>Клиент</th><th>Товар</th><th>Цена</th><th>Статус</th></tr></thead>
   <tbody>
   {orders.map(o=><tr key={o.id}><td>{o.id}</td><td>{o.client}</td><td>{o.item}</td><td>{o.price}</td><td>{o.status}</td></tr>)}
   </tbody>
  </table>
 </main>
}
