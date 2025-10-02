import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find().lean();
  // console.log('Fetched products from DB:', products);

  return new Response(JSON.stringify({ products }), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const p = await Product.create(body);
  return new Response(JSON.stringify({ product: p }), { status: 201 });
}
