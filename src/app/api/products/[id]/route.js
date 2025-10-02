import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;
  await Product.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;
  const product = await Product.findById(id).lean();
  if (!product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify({ product }), { status: 200 });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();
  if (!updatedProduct) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify({ product: updatedProduct }), {
    status: 200,
  });
}
