import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeSelectActions } from "../../store/employee-select-slice";
import Button from "./Button";

const EmployeeSelectWithSearch = ({
  label = "",
  options = [],
  onChange,
  className = "",
  ...props
}) => {
  const [query, setQuery] = useState("");
  const [localQuery, setLocalQuery] = useState("");
  const isOpen = useSelector((state) => state.employeeSelect.isOpen);
  const isFocused = useSelector((state) => state.employeeSelect.isFocused);
  const selectedOption = useSelector(
    (state) => state.employeeSelect.selectedOption
  );
  const dispatch = useDispatch();
  const showOption = useRef(null);
  const debounceTimer = useRef(null);

  const debounceUpdateQuery= useCallback((newQuery)=>{
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      console.log('firsts1');
      setQuery(newQuery);
    }, 500);
  },[])

  const filteredItems = options?.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  console.log("options", options);

  function handleQueryChange(e) {
    const value = e.target.value;
    setLocalQuery(value);
    debounceUpdateQuery(value);    
  }

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

  const handleOpen = (e) => {
    e.stopPropagation();
    console.log('first')
    dispatch(employeeSelectActions.setIsOpen(true));
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    dispatch(employeeSelectActions.setIsOpen(!isOpen));
    
    if (selectedOption.length === 0) {
      dispatch(employeeSelectActions.setIsFocused(!isFocused));
    }
      setQuery("");
      setLocalQuery("");
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

  function unCheckedEmployee(employee) {
    const updatedEmployeeList = selectedOption.filter(
      (selected) => selected.employeeId !== employee.employeeId
    );
    console.log(selectedOption);
    dispatch(employeeSelectActions.setSelectedOption(updatedEmployeeList));
  }

  const handleBlur = () => {
    if (selectedOption) {
      dispatch(employeeSelectActions.setIsFocused(true));
    } else {
      dispatch(employeeSelectActions.setIsFocused(false));
    }
  };

  return (
    <div className={`relative ${className && className}`} onClick={(e) => e.stopPropagation()} ref={showOption}>
      <input type="hidden" value={selectedOption ?? []} {...props} />
      <div
        className={`group border rounded cursor-pointer w-full p-2 sm:p-3.5 flex items-center justify-between text-gray-900 bg-transparent border-solid appearance-none hover:border-gray-400 border-gray-200
        ${isFocused ? "border-blue-900" : "border-gray-200"}`}
        onClick={handleOpen}
        onBlur={handleBlur}
        role="combobox"
        // aria-expanded={isOpen}
        // tabIndex={0}
      >
        <span
          className={`flex-1 flex flex-wrap gap-2 max-h-16 overflow-y-auto [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-neutral-700
            [&::-webkit-scrollbar-thumb]:bg-neutral-400 text-gray-800 text-xs sm:text-sm md:text-base`}
        >
          {selectedOption?.map((employee) => (
            <span
              key={employee.employeeId}
              className="inline-flex items-center whitespace-nowrap bg-stone-100 hover:bg-stone-200 rounded-2xl p-1"
            >
              {employee.name}
              <Button
                textOnly={true}
                className="rounded-50 h-6 w-6 grid place-items-center text-stone-400 hover:text-red-500 stroke-transparent"
                type="button"
                onClick={() => {
                  unCheckedEmployee(employee);
                  console.log(employee);
                }}
              >
                <svg
                  className="fill-current stroke-inherit"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                </svg>
              </Button>
            </span>
          ))}
          <input
            type="search"
            className="w-11/12"
            placeholder="Select employees"
            autoComplete="off"
            value={localQuery}
            // onChange={(e) => setQuery(e.target.value)}
            onChange={(e) => handleQueryChange(e)}
          ></input>
        </span>
        <Button
          type="button"
          className="p-2"
          onClick={(e)=>{handleToggle(e);}}
        >
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
        </Button>
      </div>

      {isOpen && (
        <ul
          className="absolute z-20 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-24 sm:max-h-28 bottom-105 overflow-y-auto [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-neutral-700
          [&::-webkit-scrollbar-thumb]:bg-neutral-400"
        >
          {filteredItems?.map((option) => (
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

export default EmployeeSelectWithSearch;
