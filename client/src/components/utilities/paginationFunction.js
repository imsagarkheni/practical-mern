export const fetchPageNumbers = (totalPages, currentPage, maxPages) => {
  const halfMaxPages = Math.floor(maxPages / 2);
  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  if (endPage - startPage + 1 < maxPages) {
    if (currentPage - startPage > endPage - currentPage) {
      startPage = Math.max(1, endPage - maxPages + 1);
    } else {
      endPage = Math.min(totalPages, startPage + maxPages - 1);
    }
  }

  if (startPage > endPage) {
    return [];
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
