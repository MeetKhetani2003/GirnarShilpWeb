'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalInquiries: 0 });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const p = await axios.get('/api/products').then((r) => r.data);
      const i = await axios.get('/api/inquiries').then((r) => r.data);
      setProducts(p.products || []);
      setStats({
        totalProducts: (p.products || []).length,
        totalInquiries: (i.inquiries || []).length,
      });
    }
    fetchData();
  }, []);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='p-4 rounded shadow'>
          Total products
          <br />
          <strong>{stats.totalProducts}</strong>
        </div>
        <div className='p-4 rounded shadow'>
          Total inquiries
          <br />
          <strong>{stats.totalInquiries}</strong>
        </div>
        <div className='p-4 rounded shadow'>
          Low stock alerts
          <br />
          <strong>{products.filter((p) => p.stock <= 2).length}</strong>
        </div>
      </div>

      <h2 className='text-xl font-semibold mb-3'>Products</h2>
      <div className='overflow-auto bg-white rounded shadow'>
        <table className='min-w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='p-3 text-left'>Title</th>
              <th className='p-3 text-left'>Category</th>
              <th className='p-3 text-left'>Stock</th>
              <th className='p-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className='border-t'>
                <td className='p-3'>{p.title}</td>
                <td className='p-3'>{p.category}</td>
                <td className='p-3'>{p.stock}</td>
                <td className='p-3'>
                  {/* edit/delete buttons - implement later */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
