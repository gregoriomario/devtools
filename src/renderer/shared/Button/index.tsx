/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Spinner from '../Spinner';

export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, className = '', children, type, ...args }, ref) => {
    return (
      <button
        {...args}
        type={type}
        ref={ref}
        className={`border flex justify-center items-center py-1 px-3 text-sm rounded-md ${className}`}
      >
        {loading && <Spinner size="sm" />}
        {children || 'Submit'}
      </button>
    );
  }
);

Button.defaultProps = {
  className: '',
  loading: false,
  type: 'button',
  children: <></>,
};

export default Button;
