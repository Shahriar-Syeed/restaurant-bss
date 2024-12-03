import { useCallback, useRef, useState } from "react";

export default function usePageItems(
  initialItemsPerPage,
  loadEveryLastElement,
  data={ totalRecords: 0 },
  isLoading
) {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const observeRef = useRef();
  console.log(data.totalRecords)
  const hasMoreOrder = data.totalRecords - itemsPerPage;
  const lastElementRef = useCallback(
    (node) => {
      console.log(node)
      if (isLoading) return;
      if (observeRef.current) observeRef.current.disconnect();
      observeRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreOrder > 0) {
          if (itemsPerPage + loadEveryLastElement < data.totalRecords) {
            setItemsPerPage(
              (prevTableCount) => prevTableCount + loadEveryLastElement
            );
          } else {
            setItemsPerPage(data.totalRecords);
          }
        }
      });
      if (node) observeRef.current.observe(node);
    },
    [isLoading, hasMoreOrder]
  );

  return { itemsPerPage, lastElementRef };
}
