import { useEffect, useState } from "react";
import Select from "./UI/Select";
import Button from "./UI/Button";


export default function Pagination({
  className,
  totalPages=1,
  totalRecord =0,
  onChangePageNumber,
  onChangeItemsPerPage,
}) {
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageOption, setPageOption]= useState([ { value: 10, label: "10" },]);

  useEffect(()=>{
    console.log(totalRecord)
    if(totalRecord>10){
      let option=[];
      for(let i=10; i<=totalRecord;i+=10){
        console.log(i);
        option.push({value: i+10, label:`${i+10}`});
      }
      setPageOption(prev=> prev.concat(option));
      console.log('option',pageOption,option, totalRecord)
    }
  },[totalRecord])

 
  
  function handleNextPage() {
    if (currentPageNumber < totalPages) {
      const nextPage = currentPageNumber + 1;
      setCurrentPageNumber(nextPage);
      onChangePageNumber(nextPage);
    }
  }

  // Go to the previous page
  function handlePrevPage() {
    if (currentPageNumber > 1) {
      const previousPage = currentPageNumber - 1;
      setCurrentPageNumber(previousPage);
      onChangePageNumber(previousPage);
    }
  }

  function handlePerPageChange(event){
    const newItemsPerPage =parseInt(event.target.value, 10);
    setCurrentItemsPerPage(newItemsPerPage);
    setCurrentPageNumber(1);
    onChangeItemsPerPage(newItemsPerPage);
    onChangePageNumber(1);

  }

  let cssClass = "flex justify-end items-center gap-3 " + className;

  return (
    <div className={cssClass}>
      <Select
        label="Items Per Page"
        options={pageOption}
        value={currentItemsPerPage}
        onChange={handlePerPageChange}
        className="gap-2"
      />
      <p>
        {Math.min((currentPageNumber - 1) * currentItemsPerPage + 1, totalRecord)}-
        {Math.min(currentPageNumber * currentItemsPerPage, totalRecord)} of {totalRecord}
      </p>
      <div>
        <Button
          textOnly
          className="inline-flex place-items-center p-2"
          onClick={handlePrevPage}
          disabled={currentPageNumber === 1}
        >
          <svg
            className="flex-shrink-0 w-6 h-6 text-primary transition duration-75"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
          </svg>
        </Button>
        <Button
          textOnly
          className="inline-flex place-items-center p-2"
          disabled={currentPageNumber === totalPages || totalRecord === 0}
          onClick={handleNextPage}
        >
          <svg
            className="flex-shrink-0 w-6 h-6 text-primary transition duration-75"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}