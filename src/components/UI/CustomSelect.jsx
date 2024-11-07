import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customSelectActions } from "../../store/custom-select-slice";

const CustomSelect = ({
  label,
  options = [],
  className,
  id,
  onChanged,
  ...props
}) => {
  const isOpen = useSelector((state) => state.customSelect.isOpen);
  const isFocused = useSelector((state) => state.customSelect.isFocused);
  const selectedOption = useSelector(
    (state) => state.customSelect.selectedOption
  );
  const dispatch = useDispatch();
  const showOption = useRef();
  


  useEffect(() => {
    const handler = (e) => {
      if (!showOption.current.contains(e.target)) {
        dispatch(customSelectActions.setIsOpen(false));
      }
    };
    document.addEventListener("mousedown", handler);
    dispatch(customSelectActions.setSelectedOption(null));
    dispatch(customSelectActions.setIsFocused(false));

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleToggle = () => {
    dispatch(customSelectActions.setIsOpen(!isOpen));

    if (
      !selectedOption ||
      (selectedOption && selectedOption.length === 0)
    ) {
      dispatch(customSelectActions.setIsFocused(!isFocused));
    }
  };


  const handleSelect = (option) => {

    dispatch(customSelectActions.setSelectedOption(option));

    dispatch(customSelectActions.setIsOpen(false));

    dispatch(customSelectActions.setIsFocused(true));
    // Trigger the onChanged function passed from parent
    if (onChanged) {
      onChanged(option); // Pass the selected option to the parent
    }
  };

  const handleBlur = () => {
    dispatch(customSelectActions.setIsFocused(false));
    if (selectedOption) {
      dispatch(customSelectActions.setIsFocused(true));
    }
  };
  console.log("selectedOption", selectedOption);

  return (
    <div className={`relative ${className && className}`} ref={showOption}>
      
        <input
          type="hidden"
          value={selectedOption ? selectedOption.sendingValue : 0}
          onChange={(e)=>onChanged(e)}
          {...props}

        />

      <div
        className={`border rounded cursor-pointer w-full  p-3.5 flex items-center justify-between text-gray-900 bg-transparent border-solid appearance-none hover:border-gray-400 border-gray-200
        ${isFocused ? "border-blue-900" : "border-gray-200"}`}
        onClick={handleToggle}
        onBlur={handleBlur}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <label
          className={`absolute text-xsm sm:text-sm md:text-base transform pointer-events-none transition-all duration-300
          ${
            isFocused
              ? "scale-75 top-2 bg-white px-1 text-blue-500 -translate-y-4 origin-[0] z-10"
              : "text-gray-500 top-1/2 -translate-y-1/2 rtl:translate-x-1/4 rtl:left-auto"
          }`}
        >
          {label}
        </label>

        <span
          className={`flex-1 max-h-16 overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${
            selectedOption
              ? "text-xsm sm:text-sm md:text-base"
              : "text-gray-400 "
          }`}
        >
          { selectedOption?.label}
        </span>
        <svg
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M5 7L10 12L15 7H5Z" fill="black" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-60 overflow-y-auto">
          {options?.map((option) => (
              <li
                key={option.value}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
