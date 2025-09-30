import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import Product from '@/models/Product';
import sendEmail from '@/lib/sendEmail';

export async function GET() {
  await dbConnect();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
  return new Response(JSON.stringify({ inquiries }), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { name, email, phone, productId, message } = body;
  const product = await Product.findById(productId).lean();
  const inquiry = await Inquiry.create({
    name,
    email,
    phone,
    productId,
    productSnapshot: product,
    message,
  });

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Inquiry: ${product?.title}`,
      text: `${name} - ${phone} - ${email} - ${message}`,
    });
  } catch (e) {
    console.error('Mail failed', e);
  }

  return new Response(JSON.stringify({ inquiry }), { status: 201 });
}
