import { useState } from "react";


export default function usePaginationCall(initialItemPerPage, initialPageNumber) {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemPerPage);
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  return [itemsPerPage, setItemsPerPage, pageNumber, setPageNumber];
}
