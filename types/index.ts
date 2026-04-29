export type OrderStatus='pending'|'processing'|'paid'|'done'|'cancelled'
export interface Order{ id:string; title:string; car:string; price:number; status:OrderStatus; user_id?:string }
export interface SearchResult{ brand:string; model:string; year:string; parts:{name:string; price:number}[] }
