// src/app/page.js or src/pages/index.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import ProductCard from '@/components/ProductCard'; // Assuming this component exists

import 'react-responsive-carousel/lib/styles/carousel.min.css';

// -----------------------------------------------------------------------------
// Component Data
// -----------------------------------------------------------------------------

const SLIDES = [
  {
    img: '/hero.png', // Gujarati Title: Girnar Shilp
    title: 'ગિરનાર શિલ્પ', // Gujarati Description: 80+ વર્ષોથી માર્બલ પ્રતિમા અને મંદિર નિર્માણમાં અમારું વારસો.
    desc: '૮૦+ વર્ષોથી માર્બલ પ્રતિમા અને મંદિર નિર્માણમાં અમારું વારસો.', // Gujarati Subtitle: સ્થાપત્યનું દિવ્ય સ્વરૂપ
    subtitle: 'સ્થાપત્યનું દિવ્ય સ્વરૂપ',
  },
  {
    img: '/hero.png', // Gujarati Title: Divine Artistry
    title: 'દિવ્ય કળા', // Gujarati Description: ભગવાન-દેવીની પ્રતિમા થી લઈને પૂર્વજોના ચિત્ર આધારિત મૂર્તિ સુધી, અમે શ્રદ્ધાને સ્વરૂપ આપીએ છીએ.
    desc: 'ભગવાન-દેવીની પ્રતિમા થી લઈને પૂર્વજોના ચિત્ર આધારિત મૂર્તિ સુધી, અમે શ્રદ્ધાને સ્વરૂપ આપીએ છીએ.', // Gujarati Subtitle: Giving Shape to Faith
    subtitle: 'શ્રદ્ધાને આકાર આપીએ છીએ',
  },
  {
    img: '/hero.png', // Gujarati Title: Unmatched Craftsmanship
    title: 'અનોખી હસ્તકલા', // Gujarati Description: પથ્થરની નેમપ્લેટ, દાતાશ્રીઓની યાદી, પોર્ટ્રેટ્સ અને વધુ — શ્રેષ્ઠ કારીગરી સાથે.
    desc: 'પથ્થરની નેમપ્લેટ, દાતાશ્રીઓની યાદી, પોર્ટ્રેટ્સ અને વધુ — શ્રેષ્ઠ કારીગરી સાથે.', // Gujarati Subtitle: Supreme Workmanship
    subtitle: 'સર્વોત્તમ કારીગરી',
  },
];

const SERVICES = [
  { title: 'Marble Deities and Idols', icon: '🙏' },
  { title: 'Photo-Based Ancestor Statues', icon: '👴' },
  { title: 'Magnificent Marble Temples', icon: '🏛️' },
  { title: 'Sawan Wood & Corian Temples', icon: '🛕' },
  { title: 'Stone Artifacts and Portraits', icon: '🗿' },
  { title: 'Nameplates & Donor Lists', icon: '📜' },
];

const TESTIMONIALS = [
  {
    name: 'John Doe',
    feedback:
      'Amazing craftsmanship and attention to detail! The quality is unparalleled.',
  },
  {
    name: 'Priya Sharma',
    feedback:
      'The custom statue of my ancestor is breathtaking. Truly brought the image to life.',
  },
  {
    name: 'Raj Patel',
    feedback:
      'Highly recommend for marble and wooden temples. Exceptional service and prompt delivery.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <main className='bg-white min-h-screen text-gray-800'>
      {/* 1. Hero Section with Carousel (High Contrast) */}
      <section className='relative shadow-xl'>
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showStatus={false}
          swipeable
          emulateTouch
          className='text-center'
        >
          {SLIDES.map((slide, idx) => (
            <div key={idx} className='relative h-[65vh] md:h-[80vh] w-full'>
              {/* FIX: Use Next.js Image with 'fill' for responsive background image */}

              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className='object-cover'
              />

              <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white px-4 text-center z-10'>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className='text-xl md:text-2xl font-medium tracking-widest text-amber-300 mb-2'
                >
                  {slide.subtitle}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className='text-5xl md:text-7xl font-black drop-shadow-lg'
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className='mt-4 max-w-3xl text-lg md:text-xl leading-relaxed font-light'
                >
                  {slide.desc}
                </motion.p>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
      <section className='max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className='text-sm font-semibold uppercase text-amber-600 mb-2'>
            Our Heritage
          </p>

          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6'>
            80+ Years of
            <span className='text-amber-500'>Divine Craftsmanship</span>
          </h2>

          <p className='text-lg text-gray-600 leading-relaxed mb-4'>
            **Girnar Shilp** has carried the legacy of divine art for over eight
            decades. We are masters in creating **marble idols of deities**,
            blending age-old tradition with flawless execution.
          </p>

          <p className='text-lg text-gray-600 leading-relaxed'>
            From **magnificent marble temples** to delicate **custom ancestor
            statues based on photographs**, our work is a testament to
            dedication and faith. Recently, we have expanded our expertise to
            crafting beautiful **Sawan wood and Corian temples**.
          </p>
        </motion.div>

        <motion.div
          className='relative'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src='/hero.png'
            alt='Girnar Shilp Craftsmanship'
            className='rounded-3xl shadow-2xl w-full h-auto object-cover'
            width={700} // Set a typical width for this component size
            height={500} // Set a typical height for this component size
          />

          <div className='absolute -top-6 -left-6 bg-amber-500 text-white p-4 rounded-full text-2xl font-bold transform rotate-3 shadow-lg'>
            Since 1940+
          </div>
        </motion.div>
      </section>
      <hr className='max-w-7xl mx-auto border-gray-200' />
      {/* 3. Services Section (Image on top, Text below) - FIXED ALIGNMENT & IMAGE LOADING */}

      <section className='max-w-7xl mx-auto px-6 py-20'>
        <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
          What We Offer
        </h2>

        <p className='text-lg text-gray-500 mb-12 text-center max-w-3xl mx-auto'>
          Explore our range of specialized services, combining traditional
          artistry with modern materials like Sawan wood and Corian.
        </p>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              className='bg-white rounded-2xl overflow-hidden shadow-xl 
         transition duration-300 transform hover:scale-[1.02] cursor-pointer group 
                   border border-gray-100 hover:border-amber-500'
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 15px 30px -8px rgba(0, 0, 0, 0.15)', // Cleaner, softer shadow on hover
              }}
            >
              {/* Image Area */}
              <div className='relative h-96 overflow-hidden'>
                {/* FIX: Use Next.js Image with 'fill' for fixed height containers */}

                <Image
                  src={`/service-${(idx % 6) + 1}.png`}
                  alt={service.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>

              {/* FIX: Added flex-col and flex-grow to align the button */}

              <div className='p-6 pt-5 bg-white flex flex-col h-full'>
                <h3 className='font-semibold text-2xl mb-2 text-gray-900'>
                  {service.title}
                </h3>

                <p className='text-gray-600 text-base font-normal mb-4 flex-grow'>
                  {/* Brief description based on the title */}

                  {idx === 0 &&
                    'Hand-carved idols of all deities in premium quality marble with intricate details.'}

                  {idx === 1 &&
                    'Lifelike statues crafted from client photos, capturing emotional value and likeness.'}

                  {idx === 2 &&
                    'Grand temple structures built from pure, high-grade marble, designed to inspire awe.'}

                  {idx === 3 &&
                    'Contemporary and traditional temple designs using premium Sawan wood and durable Corian.'}

                  {idx === 4 &&
                    'Unique stone artifacts, bespoke portraits, and custom artistic pieces for your home.'}

                  {idx === 5 &&
                    'Custom engraved nameplates and meticulously crafted donor recognition lists for trusts and institutions.'}
                </p>

                <a
                  href='#'
                  className='inline-flex items-center text-amber-600 font-semibold transition-colors hover:text-amber-700 '
                >
                  Explore Now
                  <span className='ml-2 text-xl transition-transform duration-300 transform group-hover:translate-x-1'>
                    &rarr;
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <hr className='max-w-7xl mx-auto border-gray-200' />
      {/* 4. Works Showcase Section (Optimized Grid) */}
      <section className='max-w-7xl mx-auto px-6 py-20'>
        <h2 className='text-4xl font-bold text-gray-900 mb-10 text-center'>
          Best of Our Works
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              className='overflow-hidden rounded-xl shadow-lg group cursor-pointer relative h-64'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {/* FIX: Use Next.js Image with 'fill' for fixed height containers */}

              <Image
                src={`/hero.png`}
                alt={`Work ${i}`}
                fill
                className='object-cover transform group-hover:scale-105 transition duration-500'
              />

              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-500 flex items-center justify-center'>
                <p className='text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-500 border-2 border-white px-4 py-2 rounded-full'>
                  View Details
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-xl hover:shadow-2xl'
          >
            View All Projects
          </motion.button>
        </div>
      </section>
      {/* 5. Products Section (Dynamic and Animated) */}
      <section className='max-w-7xl mx-auto px-6 py-20 bg-gray-50 rounded-3xl'>
        <h2 className='text-4xl font-bold text-gray-900 mb-10 text-center'>
          Shop Our Handcrafted Products
        </h2>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={products.length > 0 ? 'visible' : 'hidden'}
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
        >
          {products.length > 0 ? (
            products.slice(0, 4).map((p, index) => (
              <motion.div key={p._id} variants={itemVariants}>
                <ProductCard product={p} />
              </motion.div>
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>
              Loading products or no products available...
            </p>
          )}
        </motion.div>

        <div className='text-center mt-12'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='border-2 border-amber-500 text-amber-600 font-semibold py-3 px-8 rounded-full transition duration-300 hover:bg-amber-50'
          >
            View All Products
          </motion.button>
        </div>
      </section>
      {/* 6. Testimonials Section (Clean Cards) */}
      <section className='max-w-7xl mx-auto px-6 py-20'>
        <h2 className='text-4xl font-bold text-gray-900 mb-10 text-center'>
          What Clients Say
        </h2>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              className='bg-white p-8 rounded-2xl shadow-xl border-t-4 border-amber-500'
              variants={itemVariants}
            >
              <p className='text-5xl text-amber-500 mb-4'>“</p>

              <p className='mb-6 italic text-gray-700'>"{t.feedback}"</p>

              <h4 className='font-bold text-lg text-gray-900'>- {t.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* 7. Contact Section (High Impact Footer CTA) */}
      <section className='max-w-7xl mx-auto px-6 py-16 mb-16 bg-gray-900 text-white rounded-3xl shadow-2xl'>
        <div className='flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
          <div className='mb-6 md:mb-0'>
            <h2 className='text-4xl font-bold mb-2'>Let's Create Together</h2>

            <p className='text-lg text-gray-400'>
              Contact us today to discuss your vision for divine sculpture or
              temple design.
            </p>
          </div>

          <div className='flex flex-col space-y-2 text-lg font-medium'>
            <p>
              <span className='text-amber-500 font-bold'>📍 Girnar Shilp:</span>
              Gujarat, India
            </p>

            <p>
              <span className='text-amber-500 font-bold'>📞 Phone:</span> +91
              12345 67890
            </p>

            <p>
              <span className='text-amber-500 font-bold'>📧 Email:</span>
              info@girnarshilp.com
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-xl mt-6 md:mt-0'
          >
            Get Started
          </motion.button>
        </div>
      </section>
    </main>
  );
}
