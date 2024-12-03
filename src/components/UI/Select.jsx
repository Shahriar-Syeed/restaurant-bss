const Select = ({
  label,
  options,
  value,
  onChange,
  outerClassName,
  className,
  labelClassName,
  selectedOption,
  id,
  name,
  ...props
}) => {
  return (
    <div className={`${!outerClassName && 'inline-flex items-center'} ${outerClassName && outerClassName}`}>
      {label && (
        <label className={`${!labelClassName && 'text-gray-700 text-sm font-medium'} ${labelClassName && labelClassName}`}>{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-50 ${className && className}`}
        id={id}
        name={name ? name : id}
        {...props}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value} selected={selectedOption === option.label} >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
