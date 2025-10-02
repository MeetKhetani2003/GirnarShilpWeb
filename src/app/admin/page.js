'use client';
import {
  Zap,
  Tag,
  MessageSquare,
  Package,
  AlertTriangle,
  Trash2,
  Edit,
  PlusCircle,
  LayoutDashboard,
} from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import InquiryForm from '@/components/admin/InquiryForm';
import ProductForm from '@/components/admin/ProductForm';

// --- Reusable Components ---

const StatCard = ({ title, value, icon, color }) => (
  <div className='p-6 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-between transition-shadow hover:shadow-2xl'>
    <div>
      <p className='text-sm font-medium text-gray-500 uppercase'>{title}</p>
      <strong className='text-4xl font-extrabold text-gray-900 mt-1 block'>
        {value}
      </strong>
    </div>
    <div className={`p-3 rounded-full text-white ${color}`}>{icon}</div>
  </div>
);

const InquiryCard = ({ name, productTitle, message, email, phone }) => (
  <div className='p-5 bg-white rounded-xl shadow border-l-4 border-amber-500'>
    <div className='flex justify-between items-start mb-2'>
      <h4 className='text-lg font-bold text-gray-900'>{name}</h4>
      <span className='text-xs font-medium text-gray-500'>
        {/* Assuming inquiry creation time, using today's date as a placeholder */}
        {new Date().toLocaleDateString()}
      </span>
    </div>
    <p className='text-sm text-gray-700 font-semibold mb-2'>
      Regarding: <span className='text-amber-600'>{productTitle}</span>
    </p>
    <p className='text-sm text-gray-600 italic line-clamp-2 mb-3'>
      "{message}"
    </p>
    <div className='border-t pt-2 text-xs text-gray-500'>
      <p>
        Email:{' '}
        <a href={`mailto:${email}`} className='text-blue-500 hover:underline'>
          {email}
        </a>
      </p>
      <p>Phone: {phone}</p>
    </div>
  </div>
);

const ProductInventoryRow = ({ product, handleEdit, handleDelete }) => {
  const stockClass =
    product.stock <= 2 ? 'font-bold text-red-600' : 'text-gray-500';

  const imgSrc =
    product.photos && product.photos.length > 0
      ? product.photos[0]
      : '/placeholder-image.png';

  return (
    <tr
      key={product._id}
      className={product.stock <= 2 ? 'bg-red-50/50' : 'hover:bg-gray-50'}
    >
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-3'>
        <img
          src={imgSrc}
          alt={product.title}
          className='h-10 w-10 rounded-lg object-cover border border-gray-200'
        />
        <span className='truncate max-w-xs'>{product.title}</span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800'>
          {product.category}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm'>
        <span className={stockClass}>
          {product.stock} {product.stock <= 2 && '(Low)'}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        {product.isFeatured ? 'Yes' : 'No'}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <div className='flex justify-center space-x-2'>
          <button
            onClick={() => handleEdit(product)}
            className='text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition'
            title='Edit'
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            className='text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition'
            title='Delete'
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const InquiryTableRow = ({ inquiry, handleEdit, handleDelete }) => {
  const statusColor =
    {
      New: 'bg-red-100 text-red-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      Archived: 'bg-gray-100 text-gray-800',
    }[inquiry.status] || 'bg-gray-100 text-gray-800';

  return (
    <tr key={inquiry._id} className='hover:bg-gray-50'>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
        {inquiry.name}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        {inquiry.productSnapshot?.title || 'General'}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}
        >
          {inquiry.status || 'New'}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate'>
        {inquiry.message}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <div className='flex justify-center space-x-2'>
          <button
            onClick={() => handleEdit(inquiry)}
            className='text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition'
            title='View/Edit Status'
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(inquiry._id)}
            className='text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition'
            title='Delete Inquiry'
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// MODIFIED: Accepts setProductToEdit and setInquiryToEdit as props
const SidebarLink = ({
  icon,
  title,
  viewName,
  currentView,
  setView,
  setProductToEdit, // Added as a prop
  setInquiryToEdit, // Added as a prop
}) => {
  const isActive = currentView === viewName;
  return (
    <div
      onClick={() => {
        // Clear editing state when changing views
        setView(viewName);
        // FIX: setProductToEdit is now accessed from props
        if (viewName !== 'new-product') setProductToEdit(null);
        if (viewName !== 'edit-inquiry') setInquiryToEdit(null);
      }}
      className={`flex items-center p-3 rounded-lg font-semibold transition-colors cursor-pointer ${
        isActive
          ? 'bg-amber-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className='ml-3'>{title}</span>
    </div>
  );
};

// --- Main Dashboard Component ---

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    lowStock: 0,
  });
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('dashboard');
  // State setters defined here:
  const [productToEdit, setProductToEdit] = useState(null);
  const [inquiryToEdit, setInquiryToEdit] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productRes = await axios.get('/api/products').then((r) => r.data);
      const inquiryRes = await axios.get('/api/inquiries').then((r) => r.data);

      const fetchedProducts = productRes.products || [];
      const fetchedInquiries = (inquiryRes.inquiries || []).map((i) => ({
        ...i,
        status: i.status || 'New',
      }));

      setProducts(fetchedProducts);
      setInquiries(fetchedInquiries);
      setStats({
        totalProducts: fetchedProducts.length,
        totalInquiries: fetchedInquiries.length,
        lowStock: fetchedProducts.filter((p) => p.stock <= 2).length,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- PRODUCT HANDLERS ---
  const handleDeleteProduct = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this product? This action is permanent.'
      )
    )
      return;
    try {
      await axios.delete(`/api/products/${id}`);
      alert('Product deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert(
        'Failed to delete product. Check API route /api/products/[id] (DELETE).'
      );
    }
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setView('new-product'); // Reuse the 'new-product' view for editing
  };

  // --- INQUIRY HANDLERS ---
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?'))
      return;
    try {
      await axios.delete(`/api/inquiries/${id}`);
      alert('Inquiry deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
      alert(
        'Failed to delete inquiry. Check API route /api/inquiries/[id] (DELETE).'
      );
    }
  };

  const handleEditInquiry = (inquiry) => {
    setInquiryToEdit(inquiry);
    setView('edit-inquiry');
  };

  // RENDER CONTENT FUNCTION
  const renderContent = () => {
    if (loading) {
      return (
        <div className='text-center py-20 text-lg text-gray-500'>
          Loading data...
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return (
          <>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Dashboard Overview
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
              <StatCard
                title='Total Products'
                value={stats.totalProducts}
                icon={<Package size={24} />}
                color='bg-blue-600'
              />
              <StatCard
                title='Total Inquiries'
                value={stats.totalInquiries}
                icon={<MessageSquare size={24} />}
                color='bg-amber-500'
              />
              <StatCard
                title='Low Stock Alerts'
                value={stats.lowStock}
                icon={<AlertTriangle size={24} />}
                color={stats.lowStock > 0 ? 'bg-red-600' : 'bg-green-600'}
              />
              <StatCard
                title='Featured Count'
                value={products.filter((p) => p.isFeatured).length}
                icon={<Zap size={24} />}
                color='bg-purple-600'
              />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mt-10 mb-4 border-b pb-2'>
              Recent Inquiries
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {inquiries.slice(0, 4).map((i) => (
                <InquiryCard
                  key={i._id}
                  name={i.name}
                  productTitle={i.productSnapshot?.title || 'Unknown Product'}
                  message={i.message}
                  email={i.email}
                  phone={i.phone}
                />
              ))}
            </div>
          </>
        );

      case 'products':
        return (
          <>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Product Inventory
            </h1>
            <div className='overflow-x-auto bg-white rounded-xl shadow-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Title / Image
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Category
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Stock
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Featured
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {products.map((p) => (
                    <ProductInventoryRow
                      key={p._id}
                      product={p}
                      handleEdit={handleEditProduct}
                      handleDelete={handleDeleteProduct}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'new-product':
        return (
          <>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              {productToEdit ? 'Edit Product' : 'Create New Product'}
            </h1>
            <ProductForm
              productToEdit={productToEdit}
              onSuccess={() => {
                setProductToEdit(null);
                fetchData();
                setView('products');
              }}
            />
          </>
        );

      case 'inquiries':
        return (
          <>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              All Inquiries ({stats.totalInquiries})
            </h1>
            <div className='overflow-x-auto bg-white rounded-xl shadow-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Customer Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Product
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Message Preview
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {inquiries.map((i) => (
                    <InquiryTableRow
                      key={i._id}
                      inquiry={i}
                      handleEdit={handleEditInquiry}
                      handleDelete={handleDeleteInquiry}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'edit-inquiry':
        return (
          <>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Edit Inquiry
            </h1>
            <InquiryForm
              inquiryToEdit={inquiryToEdit}
              onSuccess={() => {
                setInquiryToEdit(null);
                fetchData();
                setView('inquiries');
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar - Navigation */}
      <div className='w-64 p-6 bg-gray-800 text-white shadow-2xl'>
        <div className='text-2xl font-extrabold text-amber-400 mb-10 border-b border-gray-700 pb-4'>
          <Zap className='inline mr-2' size={20} />
          Admin Panel
        </div>
        <nav className='space-y-3'>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            title='Dashboard'
            viewName='dashboard'
            currentView={view}
            setView={setView}
            // PASSED AS PROPS:
            setProductToEdit={setProductToEdit}
            setInquiryToEdit={setInquiryToEdit}
          />
          <SidebarLink
            icon={<Tag size={20} />}
            title='Products'
            viewName='products'
            currentView={view}
            setView={setView}
            // PASSED AS PROPS:
            setProductToEdit={setProductToEdit}
            setInquiryToEdit={setInquiryToEdit}
          />
          <SidebarLink
            icon={<PlusCircle size={20} />}
            title='New Product'
            viewName='new-product'
            currentView={view}
            setView={setView}
            // PASSED AS PROPS:
            setProductToEdit={setProductToEdit}
            setInquiryToEdit={setInquiryToEdit}
          />
          <SidebarLink
            icon={<MessageSquare size={20} />}
            title='Inquiries'
            viewName='inquiries'
            currentView={view}
            setView={setView}
            // PASSED AS PROPS:
            setProductToEdit={setProductToEdit}
            setInquiryToEdit={setInquiryToEdit}
          />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 p-8 overflow-auto'>{renderContent()}</div>
    </div>
  );
}
