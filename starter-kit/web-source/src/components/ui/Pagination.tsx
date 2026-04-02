import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showPageNumbers = true, 
  maxVisiblePages = 5 
}: PaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button 
        className="pagination__btn pagination__btn--prev" 
        disabled={currentPage === 1} 
        onClick={handlePrevious}
        aria-label="Previous page"
      >
        &laquo;
      </button>
      
      {showPageNumbers && getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button 
            key={`page-${index}`} 
            className={`pagination__btn ${page === currentPage ? 'pagination__btn--active' : ''}`} 
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ) : (
          <span 
            key={`ellipsis-${index}`} 
            className="pagination__ellipsis"
            aria-hidden="true"
          >
            {page}
          </span>
        )
      ))}
      
      <button 
        className="pagination__btn pagination__btn--next" 
        disabled={currentPage === totalPages} 
        onClick={handleNext}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </nav>
  );
}
