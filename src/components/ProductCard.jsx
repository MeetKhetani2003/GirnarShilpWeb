'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='bg-white rounded-2xl shadow-lg overflow-hidden'
    >
      <div className='relative w-full h-64'>
        <Image
          src={product.photos?.[0] || '/placeholder.png'}
          alt={product.title}
          fill
          className='object-cover'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-900'>{product.title}</h3>
        <p className='text-sm text-gray-600 line-clamp-2'>
          {product.description}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className='mt-3 inline-block text-violet-600 font-medium hover:underline'
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
