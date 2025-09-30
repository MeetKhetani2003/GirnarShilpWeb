'use client'; // <-- FIX: Declares this component as a client component

import { motion } from 'framer-motion'; // Framer Motion is now correctly imported
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const FooterLink = ({ href, children }) => (
    <li>
      <Link
        href={href}
        className='flex items-center hover:text-amber-400 transition-colors group'
      >
        <ChevronRight
          size={16}
          className='mr-1 text-amber-500 transition-transform group-hover:translate-x-1'
        />
        {children}
      </Link>
    </li>
  );

  return (
    <footer className='bg-gray-800 text-gray-300 py-16 mt-20 border-t-8 border-amber-500'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12'>
        {/* Column 1: Brand & Motto */}
        <div className='md:col-span-1'>
          <h3 className='text-3xl font-black text-amber-500 tracking-wider mb-3'>
            Girnar Shilp
          </h3>
          <p className='mt-2 text-base text-gray-400'>
            Over 80 years of mastery in divine sculpture and marble temple
            construction. We bring faith to form.
          </p>
        </div>
        {/* Column 2: Quick Links */}
        <div>
          <h4 className='font-bold text-xl text-white mb-5'>Quick Links</h4>
          <ul className='space-y-3 text-base'>
            <FooterLink href='/products'>Products Showcase</FooterLink>
            <FooterLink href='/services'>Our Services</FooterLink>
            <FooterLink href='/works'>Best of Our Works</FooterLink>
            <FooterLink href='/about'>Our Heritage</FooterLink>
            <FooterLink href='/testimonials'>Testimonials</FooterLink>
          </ul>
        </div>
        {/* Column 3: Contact */}
        <div>
          <h4 className='font-bold text-xl text-white mb-5'>Get In Touch</h4>
          <div className='space-y-4 text-base'>
            <p className='flex items-start text-gray-400'>
              <MapPin
                size={20}
                className='mr-3 text-amber-500 flex-shrink-0 mt-1'
              />
              Gujarat, India
            </p>
            <p className='flex items-center text-gray-400'>
              <Phone size={20} className='mr-3 text-amber-500' />
              +91-XXXXXXXXXX
            </p>
            <p className='flex items-center text-gray-400'>
              <Mail size={20} className='mr-3 text-amber-500' />
              info@girnarshilp.com
            </p>
          </div>
        </div>
        {/* Column 4: Newsletter/CTA */}
        <div>
          <h4 className='font-bold text-xl text-white mb-5'>Inquire Now</h4>
          <p className='text-sm mb-4 text-gray-400'>
            Ready for a custom piece? Send us a message today.
          </p>
          <Link href='/contact'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full bg-amber-500 text-white p-3 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-lg'
            >
              Start Your Project
            </motion.button>
          </Link>
        </div>
      </div>
      {/* Copyright */}
      <div className='max-w-7xl mx-auto px-6 border-t border-gray-700 mt-12 pt-8'>
        <p className='text-center text-sm text-gray-500'>
          © {currentYear} Girnar Shilp. All rights reserved. | Crafted with
          divine passion.
        </p>
      </div>
    </footer>
  );
}
