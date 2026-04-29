import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { amount } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Оплата заказа"
          },
          unit_amount: amount * 100
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: "https://your-site.vercel.app/success",
    cancel_url: "https://your-site.vercel.app/cancel"
  });

  return Response.json({ url: session.url });
}
