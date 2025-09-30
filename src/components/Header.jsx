'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: '/products', label: 'Products' },
    { href: '/services', label: 'Services' },
    { href: '/works', label: 'Works' },
    { href: '/about', label: 'About' },
  ];

  // Component for desktop links with underline hover effect
  const NavLink = ({ href, children, isMobile = false }) => (
    <Link
      href={href}
      className={`font-medium transition duration-300 relative group 
        ${
          isMobile
            ? 'text-xl text-gray-800 py-2'
            : 'text-gray-700 hover:text-amber-600'
        }`}
      onClick={() => setIsOpen(false)}
    >
      {children}
      <span className='absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center'></span>
    </Link>
  );

  return (
    <header className='sticky top-0 bg-white shadow-lg z-50 border-b border-gray-100'>
      <nav className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-5'>
        {/* Logo/Brand Name */}
        <Link
          href='/'
          className='text-3xl font-black text-amber-600 tracking-wider hover:text-amber-700 transition-colors'
        >
          Girnar Shilp
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-10 items-center'>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <Link href='/contact'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-amber-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg'
            >
              Contact Us
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-gray-700 focus:outline-none p-1'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle navigation menu'
        >
          {isOpen ? (
            <X size={30} className='text-amber-600' />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className='md:hidden bg-gray-50 border-t border-gray-200 py-6 px-6'
        >
          <div className='flex flex-col items-center space-y-4'>
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} isMobile>
                {item.label}
              </NavLink>
            ))}
            <Link href='/contact' className='w-full max-w-xs pt-4'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg'
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
