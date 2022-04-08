import React, { forwardRef } from 'react';

type AlertProps = {
  className?: string;
  children?: React.ReactNode;
  type?: 'success' | 'error' | 'warning';
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, type }: AlertProps, ref) => {
    let CLASS;
    switch (type) {
      case 'success':
        CLASS = 'bg-green-300 text-slate-700';
        break;
      case 'error':
        CLASS = 'bg-red-300 text-slate-700';
        break;
      case 'warning':
        CLASS = 'bg-yellow-300 text-slate-700';
        break;
      default:
        CLASS = 'bg-green-300 text-slate-700';
        break;
    }
    return (
      <div ref={ref} className={`py-2 px-3 rounded-md ${CLASS} ${className}`}>
        {children}
      </div>
    );
  }
);

Alert.defaultProps = {
  className: '',
  children: <></>,
  type: 'error',
};

export default Alert;
