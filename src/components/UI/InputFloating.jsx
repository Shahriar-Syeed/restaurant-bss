export default function InputFloating({
  children,
  id,
  name,
  error,
  type,
  disabled,
  errorClassName,
  ...props
}) {
  return (
    <div className="relative group">
      <input
        {...props}
        id={id ?? name}
        name={name ?? id}
        className={`block sm:p-3.5 p-1.5 w-full text-sm md:text-base text-gray-950 ${
          disabled ? "bg-stone-50" : "bg-transparent"
        } ${
          type !== "date" && " z-10"
        } rounded border border-gray-200 placeholder-shown:border-gray-200 group-hover:border-gray-400 appearance-none focus:outline-none focus:ring-0 ${
          type === "date"
            ? "focus:border-blue-600"
            : "focus:placeholder-shown:border-blue-600"
        } hover:focus:border-blue-900 focus:z-0 peer border-solid group-focus:border-blue-600 relative`}
        placeholder=" "
        type={type}
        disabled={disabled}
      />
      <label
        htmlFor={id ?? name}
        className={`absolute sm:text-sm text-xs text-gray-600 duration-300 transform  -translate-y-3.5 sm:-translate-y-4 scale-75 top-2 origin-[0]  ${
          disabled ? "bg-stone-50" : "bg-gradient-transparent-to-white"
        }  px-1 ms-1 peer-focus:px-1 peer-focus:text-blue-600 z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:z-0 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:z-10 peer-focus:scale-75 sm:peer-focus:-translate-y-4 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-has-[hover]:`}
      >
        {children}
      </label>
      {error && (
        <div className={errorClassName ?? ""}>
          {<p>{error ?? "Something went wrong"}</p>}
        </div>
      )}
    </div>
  );
}
