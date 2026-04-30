const users=[
{name:'Maxim',email:'max@mail.com',orders:5},
{name:'Andrei',email:'and@mail.com',orders:2},
{name:'Igor',email:'ig@mail.com',orders:7}
]

export default function Users(){
 return <main className="adminTableWrap">
  <h1>Пользователи</h1>
  <table className="adminTable">
   <thead><tr><th>Имя</th><th>Email</th><th>Заказов</th></tr></thead>
   <tbody>
   {users.map(u=><tr key={u.email}><td>{u.name}</td><td>{u.email}</td><td>{u.orders}</td></tr>)}
   </tbody>
  </table>
 </main>
}
