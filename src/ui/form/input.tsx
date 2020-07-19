import React from 'react';
import { camelCaseOf } from 'helper/common-helper';

interface Options {
  name: string;
  value: string;
}

interface InputProps {
  ref?: any;
  id?: string;
  max?: number;
  min?: number;
  name: string;
  label?: string;
  type?: string;
  checked?: boolean;
  readonly?: boolean;
  className?: string;
  required?: boolean;
  hideLabel?: boolean;
  placeholder?: string;
  value?: string | number;
  options?: Array<Options>;
  onChange?: (e: any) => any;
}

export const Input = (props: InputProps) => {
  const {
    id,
    ref,
    max,
    min,
    type,
    name,
    label,
    value,
    readonly,
    onChange,
    required,
    className,
    placeholder,
  } = props;

  return (
    <div className="col-12 form-group p-0">
      {label && <label className="small mb-0">{label}</label>}
      <input
        id={id}
        ref={ref}
        type={type}
        name={name}
        value={value}
        minLength={min}
        maxLength={max}
        autoComplete="off"
        onChange={onChange}
        required={required}
        readOnly={readonly}
        placeholder={placeholder}
        className={`${className} form-control`}
      />
    </div>
  );
};

export const TextArea = (props: InputProps) => {
  const { name, label, className, required, placeholder } = props;

  return (
    <div className="col-12 form-group p-0">
      {label && <label className="small mb-0">{label}</label>}
      <textarea
        name={name}
        rows={Number(4)}
        required={required}
        placeholder={placeholder}
        className={`${className} form-control`}
      ></textarea>
    </div>
  );
};

export const RadioButton = (props: InputProps) => {
  const { id, name, value, hideLabel, required, onChange } = props;

  return (
    <p>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        required={required}
        onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
      />
      <label htmlFor={id}>
        {!hideLabel && typeof value === 'string' ? camelCaseOf(value) : value}
      </label>
    </p>
  );
};

export const Select = (props: InputProps) => {
  const { name, placeholder, options = [], required, className, label } = props;

  return (
    <>
      {label && <label className="small mb-0">{label}</label>}
      <select
        name={name}
        required={required}
        className={`custom-select ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};
