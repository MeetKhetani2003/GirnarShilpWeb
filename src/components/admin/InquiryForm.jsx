import axios from 'axios';
import { Save, Loader2, XCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

/**
 * InquiryForm component handles viewing details and updating the status of an inquiry.
 * It uses the 'edit-inquiry' view in the AdminDashboard.
 * @param {object} props
 * @param {object | null} props.inquiryToEdit The inquiry object being edited.
 * @param {function} props.onSuccess Callback to execute after a successful save.
 */
const InquiryForm = ({ inquiryToEdit, onSuccess }) => {
  // If inquiryToEdit is null (which shouldn't happen for 'edit-inquiry' view
  // but good for safety), initialize with default/empty state.
  const initialFormState = inquiryToEdit || {
    _id: null,
    name: '',
    email: '',
    phone: '',
    message: '',
    productSnapshot: { title: 'General Inquiry' },
    status: 'New',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData(initialFormState);
    setError('');
    setSuccessMessage('');
  }, [inquiryToEdit]);

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData._id) {
      setError('Error: Cannot update inquiry without an ID.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Only send the necessary data for status update
      const updatePayload = {
        status: formData.status,
      };

      const url = `/api/inquiries/${formData._id}`;
      // Use PUT to update the existing document
      await axios.put(url, updatePayload);

      setSuccessMessage('Inquiry status updated successfully!');
      setTimeout(() => {
        onSuccess(); // Navigate back to inquiry list and refresh data
      }, 1000);
    } catch (err) {
      console.error('Inquiry update failed:', err);
      setError(
        'Failed to update inquiry. Please check the API route /api/inquiries/[id] (PUT).'
      );
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ['New', 'In Progress', 'Completed', 'Archived'];

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl border border-gray-100'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-3'>
        Inquiry Details
      </h2>

      {/* Customer & Product Info */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <p className='text-sm font-semibold text-gray-500'>Customer Name</p>
          <p className='text-lg font-medium text-gray-900'>{formData.name}</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <p className='text-sm font-semibold text-gray-500'>
            Regarding Product
          </p>
          <p className='text-lg font-medium text-amber-600'>
            {formData.productSnapshot?.title || 'General Inquiry'}
          </p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <p className='text-sm font-semibold text-gray-500'>Email</p>
          <a
            href={`mailto:${formData.email}`}
            className='text-lg font-medium text-blue-600 hover:underline'
          >
            {formData.email}
          </a>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <p className='text-sm font-semibold text-gray-500'>Phone</p>
          <p className='text-lg font-medium text-gray-900'>
            {formData.phone || 'N/A'}
          </p>
        </div>
      </div>

      {/* Message Body */}
      <div className='bg-gray-100 p-4 rounded-lg border border-gray-300 mb-8'>
        <p className='text-sm font-semibold text-gray-600 mb-2'>Message</p>
        <p className='text-base text-gray-800 whitespace-pre-wrap'>
          {formData.message}
        </p>
      </div>

      {/* Status Update Form */}
      <form onSubmit={handleSubmit} className='mt-8'>
        <div className='mb-6'>
          <label
            htmlFor='status'
            className='block text-lg font-medium text-gray-700 mb-2'
          >
            Update Status
          </label>
          <select
            id='status'
            name='status'
            value={formData.status}
            onChange={handleStatusChange}
            className='mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-lg rounded-md shadow-sm transition'
            required
            disabled={loading}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300'>
            <XCircle size={20} className='mr-2' />
            {error}
          </div>
        )}
        {successMessage && (
          <div className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 border border-green-300 font-semibold'>
            {successMessage}
          </div>
        )}

        <button
          type='submit'
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white transition-colors ${
            loading
              ? 'bg-amber-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={20} className='animate-spin mr-2' />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} className='mr-2' />
              Save Status Update
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
