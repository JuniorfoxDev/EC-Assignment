import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://intern-task-api.bravo68web.workers.dev/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('error');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateButtons.push(
      <button key={i} onClick={() => paginate(i)} className={`px-4 py-2 border ${currentPage === i ? 'bg-blue-500 text-white' : ''}`}>
        {i}
      </button>
    );
  }

  return (
    <div className='min-h-screen p-8'>
      <h2 className='text-2xl font-bold mb-4'>All Products</h2>
      {email && <p className="mb-4 text-gray-700">Logged in as: {email}</p>}
      <input type="text" placeholder='Search some products' value={searchTerm} onChange={handleSearch} className='p-2 border border-gray-300 rounded mb-4 w-full' />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {currentItems.map((product) => (
          <div key={product.id} className='border p-4 rounded shadow-sm'>
            <img src={product.thumbnail} alt="" className='w-full h-40 object-cover mb-4' />
            <h3 className='text-lg font-bold mb-3'>{product.title}</h3>
            <p className='text-gray-600 mb-2'>Rs.{product.price}</p>
          </div>
        ))}
      </div>
      <div className='mt-6 flex justify-center'>
        {paginateButtons}
      </div>
    </div>
  );
};

export default ProductList;