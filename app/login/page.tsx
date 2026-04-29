'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
 const [code,setCode]=useState('')
 const [error,setError]=useState('')
 const router=useRouter()

 const submit=()=>{
  if(code==='140578'){
   document.cookie='auth=ok; path=/'
   router.push('/dashboard')
  }else{
   setError('Неверный код доступа')
  }
 }

 return <main className="loginPage">
   <div className="loginCard">
    <h1>Вход в кабинет</h1>
    <p>Введите код доступа</p>
    <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Код" />
    <button onClick={submit}>Войти</button>
    {error && <span>{error}</span>}
   </div>
 </main>
}
