import { useState } from "react";

import PropTypes from "prop-types";
import Button from "./Button";

export default function Input({
  children,
  id,
  name,
  error,
  eyeButton,
  labelClass,
  outerClassName,
  errorClass,
  ...props
}) {
  const [toggle, setToggle] = useState(false);

  const eyeIcon = toggle ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"></path>
    </svg>
  ) : (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z"></path>
    </svg>
  );

  return (
    <>
      {eyeButton ? (
        <>
          <label
            htmlFor={id}
            className={
              labelClass
                ? labelClass
                : "block text-lg text-zinc-350 mb-2 capitalize"
            }
          >
            {children}
          </label>

          <div className="flex p-3.5 rounded border border-slate-250 items-center">
            <input
              type={toggle ? "text" : "password"}
              id={id ?? name}
              name={name ?? id}
              className="h-6 block"
              {...props}
              style={{ width: "90%" }}
            />
            <Button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="text-only hover:fill-red-600 tracking p-2 fill-slate-600 rounded-full hover:bg-slate-200"
            >
              {eyeIcon}
            </Button>
          </div>
          <div className="control-error">{error && <p>{error}</p>}</div>
        </>
      ) : (
        <>
          <div className={outerClassName && outerClassName}>
            <label
              htmlFor={id}
              className={
                labelClass
                  ? labelClass
                  : "block text-lg text-zinc-350 mb-2 capitalize"
              }
            >
              {children}
            </label>
            <input {...props} id={id ?? name} name={ name ?? id} />
          </div>
          <div className={errorClass && errorClass}>{error && <p>{error}</p>}</div>
        </>
      )}
    </>
  );
}
// Add PropTypes validation
Input.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  labelClass: PropTypes.string,
  eyeButton: PropTypes.bool,
};
