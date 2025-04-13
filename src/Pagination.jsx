import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const maxVisiblePages = 5;

  const createButton = (page) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      disabled={loading || page === currentPage}
      className={`px-3 py-1 rounded-md border text-sm transition 
        ${page === currentPage
          ? "bg-blue-600 text-white cursor-default"
          : "bg-white text-gray-700 hover:bg-gray-100"
        }
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {page}
    </button>
  );

  const renderPages = () => {
    const pages = [];

    pages.push(createButton(1));

    if (currentPage > maxVisiblePages) {
      pages.push(<span key="start-dots" className="px-2">...</span>);
    }

    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(createButton(i));
    }

    if (currentPage < totalPages - maxVisiblePages + 1) {
      pages.push(<span key="end-dots" className="px-2">...</span>);
    }

    if (totalPages > 1) {
      pages.push(createButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <nav className="inline-flex items-center space-x-1" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={`px-3 py-1 rounded-md border text-sm transition
            ${currentPage === 1 || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          Previous
        </button>

        <div className="flex  space-x-1">{renderPages()}</div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className={`px-3 py-1 rounded-md border text-sm transition
            ${currentPage === totalPages || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
