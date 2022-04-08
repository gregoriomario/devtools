/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Label from '../Label';

type DropDownProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
  side?: boolean;
};

const DropDown = ({
  children,
  className = '',
  label,
  side,
  ...args
}: DropDownProps & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className={`${side && 'grid grid-cols-2 items-center'}`}>
      {label && <Label className={`${side ? '' : 'mb-2'}`}>{label}</Label>}
      <select
        className={`border w-full border-white py-2 text-slate-700 pr-10 text-sm rounded-md ${className}`}
        {...args}
      >
        {children}
      </select>
    </div>
  );
};

DropDown.defaultProps = {
  className: '',
  label: '',
  side: false,
};

DropDown.Item = ({
  children,
  className,
  ...args
}: DropDownProps &
  React.OptionHTMLAttributes<HTMLOptionElement>): JSX.Element => {
  return (
    <option className="text-white" {...args}>
      {children}
    </option>
  );
};

export default DropDown;
