import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:Request){
 const {title,price,orderId}=await req.json()
 const session=await stripe.checkout.sessions.create({
  mode:'payment',
  line_items:[{quantity:1,price_data:{currency:'eur',product_data:{name:title},unit_amount:Math.round(price*100)}}],
  success_url:`${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${orderId}`,
  cancel_url:`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  metadata:{orderId}
 })
 return NextResponse.json({url:session.url})
}
