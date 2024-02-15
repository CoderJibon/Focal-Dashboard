import React from "react";

const CustomInput = ({
  type = "text",
  label = "label",
  id = "",
  className = "",
  name = "",
  value = "",
  onChange = null,
  autocomplete = "",
}) => {
  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control ${className}`}
          id={id}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onChange}
          autoComplete={autocomplete}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
};

export default CustomInput;
