

export default function TextArea({ children, id, labelTextColor="text-gray-500", className="", labelClass, label,name, ...props }) {
  return (
    <div className="">
      {label && <label
        htmlFor={id}
        className={`${labelClass && labelClass}`} 
      >
        {children}
      </label>}
      <textarea
        {...props}
        id={id}
        name={name? name: id}
        className={`lg:p-3.5 text-xsm sm:text-sm md:text-base lea text-gray-900 bg-transparent min-h-44 border border-gray-200 placeholder-shown:border-gray-200 group-hover:border-gray-400 rounded ${className}`}
      />
    </div>
  )
}
