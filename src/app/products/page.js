import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
