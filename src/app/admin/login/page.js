'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { username: user, password: pass });
      router.push('/admin');
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div className='container mx-auto p-6 max-w-md'>
      <h1 className='text-2xl font-bold mb-4'>Admin Login</h1>
      <form onSubmit={submit} className='space-y-4'>
        <input
          className='w-full p-2 border rounded'
          placeholder='Username'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type='password'
          className='w-full p-2 border rounded'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className='w-full bg-amber-500 text-white p-2 rounded'>
          Login
        </button>
      </form>
    </div>
  );
}
