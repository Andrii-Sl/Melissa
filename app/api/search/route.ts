import { NextResponse } from 'next/server'

export async function POST(req:Request){
 const {query}=await req.json()
 const q=String(query||'').toUpperCase()
 let result={brand:'Audi',model:'A6',year:'2018',parts:[{name:'Фара правая',price:320},{name:'Тормозной диск',price:95}]}
 if(q.includes('BMW')) result={brand:'BMW',model:'X5',year:'2019',parts:[{name:'Амортизатор',price:210},{name:'Радиатор',price:260}]}
 if(q.includes('VW')) result={brand:'Volkswagen',model:'Passat B8',year:'2017',parts:[{name:'Турбина',price:850},{name:'Фильтр',price:25}]}
 return NextResponse.json(result)
}
