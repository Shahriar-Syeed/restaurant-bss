import PropTypes from "prop-types";

export default function Button({
  children,
  textOnly,
  className,
  disabled,
  ...props
}) {
  let cssClasses = textOnly && "text-button" ;
  cssClasses = !textOnly &&  "button";
  
  disabled && (cssClasses += " " + "fill-slate-400");
  
  className && (cssClasses += " " + className);

  return (
    <button className={cssClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
// Add PropTypes validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  textOnly: PropTypes.string,
  disabled: PropTypes.string,
  className: PropTypes.string,
};
