'use client';
import axios from 'axios';
import { useState } from 'react';

export default function InquiryModal({ product }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    await axios.post('/api/inquiries', {
      name,
      email,
      phone,
      productId: product._id,
      message: msg,
    });
    alert('Inquiry sent');
    setOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='bg-amber-500 text-white px-4 py-2 rounded'
      >
        Enquire about this
      </button>
      {open && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Inquiry</h2>
            <form onSubmit={submit} className='space-y-3'>
              <input
                required
                className='w-full p-2 border rounded'
                placeholder='Your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                className='w-full p-2 border rounded'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='w-full p-2 border rounded'
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className='w-full p-2 border rounded'
                placeholder='Message'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <div className='flex gap-3'>
                <button className='bg-amber-500 text-white px-4 py-2 rounded'>
                  Send
                </button>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='px-4 py-2 border rounded'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
