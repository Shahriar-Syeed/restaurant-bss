import { forwardRef } from "react";
import defaultImage from "../../assets/default-image-preview.png";
import apiUrl from "../../apiUrl/ApiUrl";

const NewOrderTableList = forwardRef(function NewOrderTableList(
  { table, ...props },
  tableRef
) {
  return (
    <div {...props} ref={tableRef}>
      <div className="lg:w-24 md:w-20 sm:w-[4.5rem] w-16 h-16 rounded-lg overflow-clip">
        <img
          src={
            table.image === ""
              ? defaultImage
              : `${apiUrl.getTableImage}${table.image}`
          }
          alt="table"
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <span className="md:font-semibold font-medium lg:font-bold lg:text-xl md:text-lg sm:text-base text-base">
        {table.tableNumber}
      </span>
    </div>
  );
});

export default NewOrderTableList;
