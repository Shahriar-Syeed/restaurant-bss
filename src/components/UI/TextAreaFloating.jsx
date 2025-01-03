export default function TextAreaFloating({
  children,
  id,
  name,
  error,
  type,
  ...props
}) {
  return (
    <div className="relative group">
      <textarea
        {...props}
        id={id ?? name}
        name={name ?? id}
        className={`block p-3.5 w-full text-xsm sm:text-sm md:text-base lea text-gray-900 bg-transparent h-full max-h-44 ${
          type !== "date" && " z-10"
        } rounded border border-gray-200 placeholder-shown:border-gray-200 group-hover:border-gray-400 appearance-none focus:outline-none focus:ring-0 ${
          type === "date" && "focus:border-blue-600"
        }${
          type !== "date" && "focus:placeholder-shown:border-blue-600"
        } hover:focus:border-blue-900 focus:z-0 peer border-solid group-focus:border-blue-600 relative`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:z-0 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:z-10 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-has-[hover]:"
      >
        {children}
      </label>
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
