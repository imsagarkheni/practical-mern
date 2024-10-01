import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  pageNumberList,
  changePage,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="pagination-container">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
          >
            First
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link cursor-pointer"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            Previous
          </button>
        </li>
        {pageNumberList?.map((n) => (
          <li
            key={n}
            className={`page-item ${currentPage === n ? "active" : ""}`}
          >
            <button
              className="page-link cursor-pointer"
              onClick={() => changePage(n)}
            >
              {n}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </button>
        </li>
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={() => changePage(totalPages)}
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
