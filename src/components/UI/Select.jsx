const Select = ({ label, options, value, onChange, className }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {label && (
        <label className={` text-sm font-medium text-gray-700`}>{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="p-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-50"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;