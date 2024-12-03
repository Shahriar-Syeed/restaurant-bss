import defaultImage from "../../assets/default-image-preview.png";

export default function NewOrderTableList({
  table,
  handleSelection,
  isSelected,
  ...props
}) {
  return (
    <div {...props}>
      <img
        src={
          table.image === ""
            ? defaultImage
            : `https://restaurantapi.bssoln.com/images/table/${table.image}`
        }
        alt="table"
        className="w-24 max-h-16 rounded-lg object-cover"
      />
      <span className="md:font-semibold font-medium lg:font-bold lg:text-xl md:text-lg sm:text-base text-base">
        {table.tableNumber}
      </span>
    </div>
  );
}
