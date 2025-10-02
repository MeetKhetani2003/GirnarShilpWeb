// src/components/admin/ProductForm.js
'use client';
import axios from 'axios';
import { Loader2, Image as ImageIcon, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const initialProductState = {
  title: '',
  slug: '',
  shortDescription: '',
  detailedDescription: '',
  category: 'Marble Deities',
  photos: [],
  stock: 0,
  isFeatured: false,
};

export default function ProductForm({ productToEdit = null, onSuccess }) {
  const [product, setProduct] = useState(initialProductState);
  const [files, setFiles] = useState([]); // New files selected for upload
  const [loading, setLoading] = useState(false);

  const isEditing = !!productToEdit;

  // Effect to populate the form when editing a product
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        ...productToEdit,
        stock: productToEdit.stock.toString(),
      });
    } else {
      setProduct(initialProductState);
    }
    setFiles([]); // Clear any pending new files
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Convert stock to number string for input validation
    const newValue = name === 'stock' ? value.replace(/[^0-9]/g, '') : value;

    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));

    // Only auto-generate slug on creation
    if (name === 'title' && !isEditing) {
      const newSlug = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setProduct((prev) => ({ ...prev, slug: newSlug }));
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRemoveExistingPhoto = (urlToRemove) => {
    setProduct((prev) => ({
      ...prev,
      photos: prev.photos.filter((url) => url !== urlToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!product.title || !product.slug || !product.category) {
      alert('Title, Slug, and Category are required.');
      setLoading(false);
      return;
    }

    let currentPhotos = product.photos || [];

    try {
      // 1. Image Upload (only for newly selected files)
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('images', file);
        });

        const uploadResponse = await axios.post('/api/upload', formData, {});

        currentPhotos = [
          ...currentPhotos,
          ...uploadResponse.data.uploadedFilePaths,
        ];
      }

      // 2. Product Data Submission
      const finalProductData = {
        ...product,
        photos: currentPhotos,
        stock: parseInt(product.stock || 0), // Ensure stock is a number
      };

      let response;
      if (isEditing) {
        // PUT request for updating (assuming the API route is /api/products/[id])
        response = await axios.put(
          `/api/products/${productToEdit._id}`,
          finalProductData
        );
      } else {
        // POST request for creating
        response = await axios.post('/api/products', finalProductData);
      }

      if (response.status === 200 || response.status === 201) {
        alert(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert(
        'Operation failed. Check console for details. Ensure you have the /api/products and /api/upload routes set up.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-xl shadow-lg space-y-5'
    >
      <h3 className='text-xl font-bold border-b pb-3 text-gray-800'>
        {isEditing ? 'Edit Product Details' : 'New Product Details'}
      </h3>

      {/* Title & Slug */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={product.title}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Slug (URL Path)
          </label>
          <input
            type='text'
            name='slug'
            value={product.slug}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              isEditing
                ? 'bg-gray-100 cursor-not-allowed'
                : 'focus:ring-amber-500 focus:border-amber-500'
            }`}
            readOnly={isEditing}
            required
          />
        </div>
      </div>

      {/* Category & Stock & Featured */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Category
          </label>
          <select
            name='category'
            value={product.category}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
          >
            <option>Marble Deities</option>
            <option>Ancestor Statues</option>
            <option>Marble Temples</option>
            <option>Wooden Temples</option>
            <option>Stone Artifacts</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Stock
          </label>
          <input
            type='number'
            name='stock'
            value={product.stock}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
            min='0'
            required
          />
        </div>
        <div className='flex items-end pb-1'>
          <input
            type='checkbox'
            name='isFeatured'
            checked={product.isFeatured}
            onChange={handleChange}
            id='isFeatured'
            className='w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500'
          />
          <label
            htmlFor='isFeatured'
            className='ml-2 text-sm font-medium text-gray-700'
          >
            Featured Product
          </label>
        </div>
      </div>

      {/* Descriptions */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Short Description
        </label>
        <input
          type='text'
          name='shortDescription'
          value={product.shortDescription}
          onChange={handleChange}
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Rating
        </label>
        <input
          type='number'
          name='rating'
          value={product.rating}
          onChange={handleChange}
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Price
        </label>
        <input
          type='number'
          name='price'
          value={product.price}
          onChange={handleChange}
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Detailed Description
        </label>
        <textarea
          name='detailedDescription'
          value={product.detailedDescription}
          onChange={handleChange}
          rows='4'
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500'
        ></textarea>
      </div>

      {/* Photo Management */}
      <div>
        <label className='block text-sm font-bold text-gray-800 mb-2'>
          Photo Management
        </label>

        {/* Display Existing Photos for Editing */}
        {isEditing && product.photos && product.photos.length > 0 && (
          <div className='mb-4 p-3 border rounded-lg bg-gray-50'>
            <p className='text-sm font-semibold text-gray-700 mb-2'>
              Current Photos:
            </p>
            <div className='flex flex-wrap gap-3'>
              {product.photos.map((url, index) => (
                <div key={index} className='relative group'>
                  <img
                    src={url}
                    alt={`Product photo ${index + 1}`}
                    className='h-20 w-20 object-cover rounded-lg border border-gray-300'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveExistingPhoto(url)}
                    className='absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white rounded-full p-0.5 shadow group-hover:opacity-100 transition-opacity'
                    title='Remove photo'
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
            <p className='text-xs text-red-500 mt-2'>
              Note: Removing a photo here will delete its URL from the product
              upon save.
            </p>
          </div>
        )}

        {/* Upload New Photos Input */}
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Upload New Product Photos:
        </label>
        <div className='flex items-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 transition-colors'>
          <ImageIcon size={20} className='text-gray-500' />
          <input
            type='file'
            name='photos'
            accept='image/*'
            multiple
            onChange={handleFileChange}
            className='text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100'
          />
        </div>
        {files.length > 0 && (
          <p className='mt-2 text-xs text-gray-500'>
            {files.length} new file(s) selected:{' '}
            {files.map((f) => f.name).join(', ')}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className='w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors disabled:bg-gray-400'
      >
        {loading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : isEditing ? (
          'Save Changes'
        ) : (
          'Create Product'
        )}
      </button>
    </form>
  );
}
