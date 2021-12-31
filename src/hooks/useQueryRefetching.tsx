import { useState } from 'react';

/* eslint-disable no-unused-vars */
export function useQueryRefetching<T>(params: T, accessorPage: string) {
  const [paramsQuery, setParamsQuery] = useState<T>(params);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setPage = (page: number) => {
    setCurrentPage(page);
    setParamsQuery({
      ...paramsQuery,
      [accessorPage]: `=${page}`
    });
    return paramsQuery;
  };

  const nextPage = () => {
    setCurrentPage((prev) => {
      setPage(prev + 1);
      return prev + 1;
    });
    return paramsQuery;
  };

  const prevPage = () => {
    setCurrentPage((prev) => {
      setPage(prev - 1);
      return prev - 1;
    });
    return paramsQuery;
  };

  const initialPage = () => {
    setCurrentPage(1);
    setPage(1);
    return paramsQuery;
  };
  return {
    paramsQuery,
    nextPage,
    prevPage,
    initialPage,
    currentPage,
    setPage
  };
}

export const True = true;
