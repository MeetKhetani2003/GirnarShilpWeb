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

  let product = null;
  // Set a flag to track if the provided productId is a valid ObjectId format
  let isProductIdValid = true;

  // FIX 1: Use try...catch for Product lookup AND set a flag if the ID is invalid
  if (productId) {
    try {
      // This is where the CastError occurs if productId is not an ObjectId
      product = await Product.findById(productId).lean();
    } catch (e) {
      // Specifically handle the Mongoose CastError on the '_id' path during lookup
      if (e.name === 'CastError' && e.path === '_id') {
        console.warn(
          `Product ID '${productId}' failed casting to ObjectId. Proceeding without product reference.`
        );
        product = null;
        isProductIdValid = false; // Mark as invalid
      } else {
        // Re-throw any other unexpected error
        throw e;
      }
    }
  }

  console.log('Creating inquiry for product:', productId, product);

  // Build the data object for Inquiry.create
  const inquiryData = {
    name,
    email,
    phone,
    productSnapshot: product,
    message,
  };

  // FIX 2: Conditionally add productId ONLY IF it's present AND we haven't determined it's invalid.
  // If isProductIdValid is false (due to CastError), omitting it here prevents the Inquiry validation error.
  if (isProductIdValid && productId) {
    inquiryData.productId = productId;
  }

  const inquiry = await Inquiry.create(inquiryData);

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      // Added fallback text if product is null
      subject: `New Inquiry: ${product?.title || 'Unknown Product'}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}\n\nProduct ID (Raw): ${productId}`,
    });
  } catch (e) {
    console.error('Mail failed', e);
  }

  return new Response(JSON.stringify({ inquiry }), { status: 201 });
}
