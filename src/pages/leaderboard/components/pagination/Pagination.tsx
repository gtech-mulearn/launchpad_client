import React, { useContext, useState } from "react";
import { TableContext } from "../../context/tableContext";
import { getTableData } from "../../services/api";
import styles from "./pagination.module.css";

// Define the pagination interface
interface paginationProps {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  isNext?: boolean;
  isPrev?: boolean;
  totalPages?: number;
}

const Pagination = () => {
  // const pageNumbers = [1, 2, "...", 9, 10]; // Simplified for testing

  const [pageIndex, setpageIndex] = useState(1);

  const { paginationData, setpaginationData, settableData } = useContext<
    paginationProps | any
  >(TableContext);
  // console.log("paginationData", paginationData);

  const handelForward = async () => {
    if (paginationData.isNext) {
      const data = await getTableData({
        pageIndex: pageIndex + 1,
        perPage: 10,
      });
      //   console.log("data", data);
      settableData(data.data);
      setpaginationData(data.pagination);
      setpageIndex(pageIndex + 1);
    }
  };

  const handelBackward = async () => {
    // console.log("paginationData", paginationData.isPrev);
    if (paginationData.isPrev) {
      const data = await getTableData({
        pageIndex: pageIndex - 1,
        perPage: pageIndex === 2 ? 15 : 10,
      });
      console.log("data", data);
      settableData(pageIndex === 2 ? data.data.slice(3) : data.data);
      setpaginationData(data.pagination);
      setpageIndex(pageIndex - 1);
    }
  };

  const handelPageChange = async (pageNumber: number) => {
    const data = await getTableData({
      pageIndex: pageNumber,
      perPage: 10,
    });
    settableData(data.data);
    setpaginationData(data.pagination);
    setpageIndex(pageNumber);
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={handelBackward}
        className={styles.navButton}
      >
        <span className={styles.srOnly}>Previous</span>
        <svg className={styles.icon} viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {paginationData.totalPages ? (
        Array(paginationData.totalPages)
          .fill(0)
          .map((_, index) => (
            <button
              onClick={() => handelPageChange(index + 1)}
              key={index}
              className={`${styles.pageButton} ${
                index + 1 === pageIndex
                  ? styles.activePageButton
                  : styles.inactivePageButton
              }`}
            >
              {index + 1}
            </button>
          ))
      ) : (
        <div className={styles.errorMessage}>table data not found</div>
      )}

      <button
        onClick={handelForward}
        className={styles.navButton}
      >
        <span className={styles.srOnly}>Next</span>
        <svg className={styles.icon} viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
