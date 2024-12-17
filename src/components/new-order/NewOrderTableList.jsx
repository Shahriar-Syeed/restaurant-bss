import { forwardRef } from "react";
import defaultImage from "../../assets/default-image-preview.png";
import apiUrl from "../../apiUrl/ApiUrl";

const NewOrderTableList = forwardRef(function NewOrderTableList(
  { table, ...props },
  tableRef
) {
  return (
    <div {...props} ref={tableRef}>
      <img
        src={
          table.image === ""
            ? defaultImage
            : `${apiUrl.getTableImage}${table.image}`
        }
        alt="table"
        className="w-24 max-h-16 rounded-lg object-cover"
      />
      <span className="md:font-semibold font-medium lg:font-bold lg:text-xl md:text-lg sm:text-base text-base">
        {table.tableNumber}
      </span>
    </div>
  );
});

export default NewOrderTableList;
