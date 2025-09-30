import Image from 'next/image';
import { notFound } from 'next/navigation';

import dbConnect from '@/lib/db';
import InquiryModal from '@/components/InquiryModal';
import Product from '@/models/Product';

export async function generateStaticParams() {
  await dbConnect();
  const products = await Product.find({}, 'slug').lean();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug }).lean();
  if (!product) notFound();

  return (
    <div className='container mx-auto p-6'>
      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className='w-full h-96 relative rounded shadow overflow-hidden'>
            <Image
              src={product.photos?.[0] || '/placeholder.jpg'}
              alt={product.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-bold'>{product.title}</h1>
          <p className='mt-2 text-gray-700'>{product.detailedDescription}</p>
          <p className='mt-4 font-semibold'>Category: {product.category}</p>
          <p className='mt-2'>Stock: {product.stock}</p>
          <div className='mt-6'>
            <InquiryModal product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
