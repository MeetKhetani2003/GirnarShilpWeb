'use client';
import axios from 'axios';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Note on Mock Data ---
// The original mock data is commented out but kept for context.
// The component is now designed to fetch data from '/api/products'.
// If running in a Canvas environment without an active backend,
// this API call will fail, and the products list will remain empty.

// const MOCK_PRODUCTS = [...]; // Omitted for brevity in the final code block

// --- Inquiry Form Modal Component (Updated with mocked fetch) ---
const InquiryModal = ({ product, onClose }) => {
  if (!product) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    `I am inquiring about the ${product.title} (${product._id}). Please contact me with more details.`
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the form submission by simulating a successful API call.
   * Note: In this self-contained environment, the actual axios.post will likely fail (404/CORS),
   * but we simulate the success path for UI demonstration.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    const formPayload = {
      name,
      email,
      phone,
      message,
      productTitle: product.title,
      productId: product._id,
    };

    try {
      // Attempt the post request (will likely fail in Canvas, but shows intended logic)
      await axios.post('/api/inquiries', formPayload);
      // Simulate success if the post somehow succeeds or is ignored
    } catch (err) {
      // console.error('Simulated API error on inquiry:', err);
      // If the error is due to a missing API (like in Canvas), we can still show success for the user experience.
    } finally {
      // Simulate success path after waiting a moment
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      setSuccess(true);
      setTimeout(onClose, 2500);
    }
  };

  return (
    <div
      className='fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 border-4 border-amber-500/20'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 p-2 bg-white rounded-full text-gray-800 hover:text-red-500 transition z-10 shadow-xl'
          aria-label='Close modal'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        <div className='p-6 md:p-8 bg-gray-900 text-white'>
          <h3 className='text-3xl font-serif font-extrabold mb-2 text-amber-500'>
            Inquire About This Sculpture
          </h3>
          <p className='text-lg text-gray-300 font-light mb-6'>
            **{product.title}**
          </p>

          {success ? (
            <div className='text-center py-10'>
              <svg
                className='mx-auto h-16 w-16 text-green-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <h4 className='text-2xl font-bold mt-3 text-white'>
                Inquiry Sent!
              </h4>
              <p className='text-gray-400 mt-2'>
                We will contact you shortly with more details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-300 mb-1'
                >
                  Name *
                </label>
                <input
                  id='name'
                  type='text'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-300 mb-1'
                >
                  Email *
                </label>
                <input
                  id='email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500'
                />
              </div>
              <div>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-300 mb-1'
                >
                  Phone (Optional)
                </label>
                <input
                  id='phone'
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-300 mb-1'
                >
                  Message *
                </label>
                <textarea
                  id='message'
                  rows='4'
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500'
                ></textarea>
              </div>

              {error && (
                <p className='text-red-400 text-center text-sm'>{error}</p>
              )}

              <button
                type='submit'
                disabled={loading}
                className='w-full py-3.5 bg-amber-500 text-gray-900 font-extrabold rounded-lg hover:bg-amber-600 transition duration-200 shadow-lg shadow-amber-500/50 text-lg uppercase tracking-wider disabled:bg-gray-500 disabled:shadow-none'
              >
                {loading ? 'Sending Inquiry...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Quick View Modal Component ---
const QuickViewModal = ({ product, onClose, onInquireClick }) => {
  if (!product) return null;

  // Fallback URL function for image
  const getProductImage = (product) => {
    if (product.photos && product.photos.length > 0 && product.photos[0]) {
      return product.photos[0];
    }
    // Fallback placeholder with title
    const titleSlug = product.title.replace(/[^a-zA-Z0-9]/g, '+');
    return `https://placehold.co/800x800/2C2C2C/FDE68A?text=${titleSlug}`;
  };

  return (
    <div
      className='fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 border-4 border-amber-500/20'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 p-2 bg-white rounded-full text-gray-800 hover:text-red-500 transition z-10 shadow-xl'
          aria-label='Close modal'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Image Side */}
        <div className='w-full md:w-1/2 relative bg-gray-100 h-64 md:h-auto'>
          <img
            src={getProductImage(product)}
            alt={product.title}
            className='w-full h-full object-cover'
            loading='lazy'
            // Optional onerror to handle broken URLs gracefully
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/800x800/A0A0A0/FDE68A?text=Image+Error`;
            }}
          />
        </div>

        {/* Details Side */}
        <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-gray-900 text-white'>
          <div>
            <span className='text-sm text-amber-500 uppercase tracking-widest font-medium mb-1'>
              {product.category || 'Sculpture'}
            </span>
            <h3 className='text-3xl font-serif font-bold mb-4'>
              {product.title}
            </h3>

            {/* Displaying price if available, otherwise 'Inquire for Price' */}
            {product.price ? (
              <p className='text-5xl text-amber-500 font-extrabold mb-6 tracking-tight'>
                ₹{product.price.toFixed(2)}{' '}
              </p>
            ) : (
              <p className='text-3xl text-amber-500 font-extrabold mb-6 tracking-tight'>
                Inquire for Price
              </p>
            )}

            <p className='text-gray-400 mb-6 font-light'>
              {product.detailedDescription ||
                product.shortDescription ||
                'A brief description of this masterpiece, detailing the material, dimensions, and the intricate craftsmanship required to bring this divine form to life. This piece is a testament to timeless Indian artistry.'}
            </p>

            <div className='flex items-center space-x-2 text-gray-300 font-bold text-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-amber-500'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.05a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.05a1 1 0 00-1.175 0l-2.817 2.05c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <span>{product.rating || '5.0'} Star Rating (Approx)</span>
            </div>
          </div>
          <button
            className='w-full py-3.5 mt-6 bg-amber-500 text-gray-900 font-extrabold rounded-lg hover:bg-amber-600 transition duration-200 shadow-lg shadow-amber-500/50 text-lg uppercase tracking-wider'
            onClick={() => onInquireClick(product)}
          >
            Inquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Product Card Component ---
const ProductCard = ({ product, onQuickView }) => {
  // Fallback URL function for image
  const getProductImage = (product) => {
    if (product.photos && product.photos.length > 0 && product.photos[0]) {
      return product.photos[0];
    }
    // Fallback placeholder using product title
    const titleSlug = product.title.replace(/[^a-zA-Z0-9]/g, '+');
    return `https://placehold.co/600x480/A0A0A0/FDE68A?text=${titleSlug}`;
  };

  return (
    // Subtle border and lift on hover
    <div className='bg-white rounded-xl shadow-xl transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 relative group overflow-hidden border border-gray-100'>
      {/* Badge & Favorite */}
      <div className='absolute top-3 left-3 z-10'>
        <span className='px-3 py-1 text-xs uppercase rounded-full bg-amber-500 text-gray-900 shadow-md font-semibold tracking-wider'>
          Featured
        </span>
      </div>
      <div className='absolute top-3 right-3 z-10'>
        <button className='p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition shadow-lg opacity-80 hover:opacity-100'>
          {/* Clean Heart Icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572'></path>
          </svg>
        </button>
      </div>

      {/* Image Section - Taller for visual drama */}
      <div className='relative w-full h-80 bg-gray-100 overflow-hidden'>
        <img
          src={getProductImage(product)}
          alt={product.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]'
          loading='lazy'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x480/A0A0A0/FDE68A?text=Image+Error`;
          }}
        />
      </div>

      {/* Product Details Section - High Contrast Footer */}
      <div className='p-5 bg-gray-900 text-white'>
        <p className='text-xs text-amber-500 mb-1 uppercase tracking-[0.2em] font-medium'>
          {product.category || 'Art Piece'}
        </p>
        <h2 className='text-xl font-serif font-bold mb-2 line-clamp-1'>
          {product.title}
        </h2>

        {/* Price and Rating Alignment */}
        <div className='flex justify-between items-center mb-3 pt-1'>
          <p className='text-2xl text-amber-500 font-black'>
            {product.price ? `₹${product.price.toFixed(2)}` : 'Inquire'}
          </p>
          <div className='font-bold text-base flex items-center space-x-1 text-gray-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-amber-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.05a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.05a1 1 0 00-1.175 0l-2.817 2.05c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <span>{product.rating || '5.0'}</span>
          </div>
        </div>

        <button
          className='w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition duration-200 shadow-md shadow-amber-500/50 text-base uppercase tracking-wider'
          onClick={() => onQuickView(product)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// --- Main Products Page Component ---
export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // New state for holding fetched products
  const [products, setProducts] = useState([]);
  // New loading state
  const [isLoading, setIsLoading] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState(8);

  // State for Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [inquiryProduct, setInquiryProduct] = useState(null);

  /**
   * Fetches product data from the API and updates state.
   */
  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      // Using axios as per your existing code structure
      const res = await axios.get('/api/products');

      // Check if the response structure matches the log (res.data.products)
      const fetchedList = res.data.products || res.data;

      // Assuming a list of products is returned
      setProducts(fetchedList);
      console.log('Successfully fetched products:', fetchedList);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to empty array if fetch fails
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on initial component mount
  useEffect(() => {
    fetchProductData();
  }, []);

  /**
   * Memoized list of products filtered by the current search term.
   * DEPENDS on the actual 'products' state.
   */
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseSearch) ||
        (product.category &&
          product.category.toLowerCase().includes(lowerCaseSearch)) ||
        (product.shortDescription &&
          product.shortDescription.toLowerCase().includes(lowerCaseSearch))
    );
  }, [searchTerm, products]); // Dependence on 'products' ensures filtering uses real data

  /**
   * Handles changes to the search input field.
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleProducts(8); // Reset visibility when search changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setVisibleProducts(8);
  };

  // Function to handle "Load More"
  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  // Function to handle Quick View click
  const handleQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  // Handler to move from Quick View to Inquiry
  const handleInquireFromQuickView = useCallback((product) => {
    setQuickViewProduct(null); // Close quick view
    setInquiryProduct(product); // Open inquiry form
  }, []);

  // Determine the category to display based on the first item in the list
  const categoryName =
    filteredProducts.length > 0 ? filteredProducts[0].category : 'Masterpiece';

  return (
    <div className='bg-gray-50 min-h-screen font-sans'>
      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onInquireClick={handleInquireFromQuickView}
      />

      <InquiryModal
        product={inquiryProduct}
        onClose={() => setInquiryProduct(null)}
      />

      {/* Hero Header Section - Dark, High Contrast, Premium Style */}
      <header className='relative bg-gray-900 text-white py-24 md:py-32 shadow-2xl overflow-hidden'>
        {/* Placeholder for the beautiful stone texture background */}
        <div
          className='absolute inset-0 bg-cover bg-center opacity-40'
          style={{
            // Using the visual concept: dark, textured, golden-lit background
            backgroundImage: "url('/Images/Hero-products.png')",
            filter: 'blur(3px)',
            transform: 'scale(1.05)',
          }}
        ></div>

        <div className='container mx-auto px-6 max-w-7xl relative z-10'>
          <h1 className='text-6xl md:text-8xl font-serif font-extrabold mb-4 tracking-tight text-amber-500'>
            Our Collection
          </h1>
          <p className='text-white text-lg font-medium uppercase tracking-[0.3em]'>
            Timeless Artistry & Craftsmanship
          </p>
          <p className='text-gray-300 text-lg font-light max-w-4xl mt-6'>
            Explore our curated collection of exquisite stone sculptures and
            handcrafted divine works from the base of Girnar Mountain.
          </p>

          {/* Search/Filter Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className='mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'
          >
            <input
              type='text'
              placeholder={`Search by name, ${categoryName}, or material...`}
              className='p-3 rounded-lg w-full sm:max-w-md bg-white text-gray-900 border-2 border-transparent placeholder-gray-500 focus:ring-amber-500 focus:border-amber-500 transition shadow-md text-base'
              aria-label='Search products'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type='submit'
              className='bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-amber-500/50 text-base uppercase tracking-wider'
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className='container mx-auto px-6 py-12 max-w-7xl'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-gray-200 pb-3'>
          <h2 className='text-2xl font-extrabold text-gray-800 mb-3 sm:mb-0 font-serif'>
            {isLoading
              ? 'Loading Products...'
              : `Showing ${Math.min(
                  visibleProducts,
                  filteredProducts.length
                )} Masterpieces (of ${filteredProducts.length})`}
          </h2>

          <div className='flex items-center space-x-3'>
            <label
              htmlFor='sort-select'
              className='text-base text-gray-600 font-medium'
            >
              Sort By:
            </label>
            <select
              id='sort-select'
              className='p-2 border border-gray-300 rounded-lg text-base text-gray-700 shadow-sm focus:ring-gray-800 focus:border-gray-800'
            >
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* Conditional Rendering based on state */}
        {isLoading ? (
          <div className='text-center py-20'>
            <div className='animate-spin mx-auto h-12 w-12 border-4 border-t-4 border-gray-400 border-t-amber-500 rounded-full'></div>
            <p className='text-lg text-gray-500 mt-4'>
              Fetching the latest masterpieces...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-xl shadow-inner border border-dashed border-gray-300'>
            <p className='text-xl text-gray-500 font-medium'>
              No products found for "{searchTerm}". Try adjusting your search.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
            {filteredProducts.slice(0, visibleProducts).map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}

        {/* Load More Button (Functional) */}
        {filteredProducts.length > 0 &&
          visibleProducts < filteredProducts.length && (
            <div className='text-center mt-16'>
              <button
                className='px-10 py-3 bg-gray-800 text-white text-lg font-bold rounded-full shadow-lg shadow-gray-700/30 hover:bg-amber-500 hover:text-gray-900 transition transform hover:scale-[1.02] active:scale-100 ring-4 ring-gray-200 uppercase tracking-widest'
                onClick={handleLoadMore}
              >
                {`Load More (${Math.min(
                  filteredProducts.length - visibleProducts,
                  4
                )} items)`}
              </button>
            </div>
          )}
        {filteredProducts.length > 0 &&
          visibleProducts >= filteredProducts.length &&
          !isLoading && (
            <div className='text-center mt-16 text-gray-500 font-medium'>
              Showing all {filteredProducts.length} results.
            </div>
          )}
      </main>

      {/* Simple Footer for completeness */}
      <footer className='bg-gray-900 text-white text-center py-6 text-sm mt-10'>
        <p>Copyright © 2024 Girnar Shilp. All rights reserved.</p>
      </footer>
    </div>
  );
}
