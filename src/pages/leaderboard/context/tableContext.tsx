import { createContext } from "react";

interface paginationProps {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  isNext?: boolean;
  isPrev?: boolean;
  totalPages?: number;
}

export const TableContext = createContext<paginationProps | {}>({});
