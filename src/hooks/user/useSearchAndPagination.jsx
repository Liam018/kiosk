import { useState } from 'react';

const useSearchAndPagination = (items, itemsPerPage = 7) => {
  // Search state and functionality
  const [searchQuery, setSearchQuery] = useState('');
  const handleInputSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredItems = items.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.account_id.toString().includes(searchQuery)
  );
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return { 
    searchQuery,
    setSearchQuery,
    handleInputSearch,
    currentPage, 
    setCurrentPage,
    totalPages,
    paginatedItems,
    handlePreviousPage,
    handleNextPage
  };
};

export default useSearchAndPagination;