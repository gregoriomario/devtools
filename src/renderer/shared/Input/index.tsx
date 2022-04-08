/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Label from '../Label';

type InputProps = {
  className?: string;
  label?: string;
  description?: string;
  side?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  className = '',
  label,
  description,
  side,
  ...args
}: InputProps) => {
  return (
    <div className={`${side && 'grid grid-cols-2 items-center'}`}>
      {label && <Label className={`${side ? '' : 'mb-2'}`}>{label}</Label>}
      <input
        {...args}
        className={`rounded-md text-black text-sm w-full ${className} appearance-none`}
      />
      {description && <Label>{description}</Label>}
    </div>
  );
};

Input.defaultProps = {
  className: '',
  label: '',
  description: '',
  side: false,
};

export default Input;
