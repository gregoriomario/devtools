import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Spinner from "../Spinner";

export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, className = "", children, ...args }, ref) => {
    return (
      <button
        {...args}
        ref={ref}
        className={`border flex justify-center items-center py-1 px-3 text-sm rounded-md ${className}`}
      >
        {loading && <Spinner size="sm" />}
        {children}
      </button>
    );
  }
);

export default Button;
