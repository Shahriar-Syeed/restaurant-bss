import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeSelectActions } from "../../store/employee-select-slice";

const EmployeeSelect = ({
  label = "",
  options = [],
  onChange,
  className = "",
  ...props
}) => {
  const isOpen = useSelector((state) => state.employeeSelect.isOpen);
  const isFocused = useSelector((state) => state.employeeSelect.isFocused);
  const selectedOption = useSelector(
    (state) => state.employeeSelect.selectedOption
  );
  const dispatch = useDispatch();
  const showOption = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (showOption.current && !showOption.current.contains(e.target)) {

        dispatch(employeeSelectActions.setIsOpen(false));
        if (!selectedOption) {
          dispatch(employeeSelectActions.setIsFocused(false));
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleToggle = () => {
    dispatch(employeeSelectActions.setIsOpen(!isOpen));

    if (selectedOption.length === 0) {
      dispatch(employeeSelectActions.setIsFocused(!isFocused));
    }
  };

  const selectOptionHandleWithCheckbox = (option) => {
    console.log(option);
    dispatch(employeeSelectActions.setIsFocused(true));

    const updatedSelected = selectedOption.some(
      (selectedValue) =>
        selectedValue.employeeId === option.sendingValue.employeeId
    )
      ? selectedOption.filter(
          (selected) => selected.employeeId !== option.sendingValue.employeeId
        )
      : [...selectedOption, option.sendingValue];
    console.log("updatedSelected", updatedSelected);
    dispatch(employeeSelectActions.setSelectedOption(updatedSelected));
    if (updatedSelected.length === 0) {
      dispatch(employeeSelectActions.setIsFocused(false));
    }
    if (onChange) {
      onChange(updatedSelected);
    }
  };

  const handleBlur = () => {
    if (selectedOption) {
      dispatch(employeeSelectActions.setIsFocused(true));
    } else {
      dispatch(employeeSelectActions.setIsFocused(false));
    }
  };

  return (
    <div className={`relative ${className && className}`} ref={showOption}>
      <input type="hidden" value={selectedOption ?? []} {...props} />
      <div
        className={`group border rounded cursor-pointer w-full p-2 sm:p-3.5 flex items-center justify-between text-gray-900 bg-transparent border-solid appearance-none hover:border-gray-400 border-gray-200
        ${isFocused ? "border-blue-900" : "border-gray-200"}`}
        onClick={handleToggle}
        onBlur={handleBlur}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <label
          className={`absolute text-xs sm:text-sm md:text-base transform pointer-events-none transition-all duration-300 
          ${
            isFocused
              ? "scale-75 top-2 bg-white px-1  -translate-y-4 origin-[0] z-10 group-focus-within:text-blue-500"
              : "text-gray-500 top-1/2 -translate-y-1/2 rtl:translate-x-1/4 rtl:left-auto"
          }`}
        >
          {label}
        </label>

        <span
          className={`flex-1 max-h-16 overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-neutral-700
          [&::-webkit-scrollbar-thumb]:bg-neutral-400 text-gray-800 text-xs sm:text-sm md:text-base`}
        >
          {selectedOption?.map((employee) => (
            <p key={employee.employeeId}>{employee.name}</p>
          ))}
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
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-24 overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-neutral-700
          [&::-webkit-scrollbar-thumb]:bg-neutral-400">
          {options?.map((option) => (
            <li
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              // onClick={() => selectOptionHandleWithCheckbox(option)}
            >
              <input
                type="checkbox"
                checked={selectedOption?.some(
                  (selectedValue) =>
                    selectedValue.employeeId === option.sendingValue.employeeId
                )}
                onChange={() => selectOptionHandleWithCheckbox(option)}
                id={option.value}
              />
              <label
                htmlFor={option.value}
                className="flex-grow cursor-pointer text-xs sm:text-sm md:text-base ps-0.5 sm:ps-1 md:ps-2"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeSelect;
