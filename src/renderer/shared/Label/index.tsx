import React from 'react';

type LabelProps = {
  children: React.ReactNode;
  className?: string;
};

const Label = ({ children, className }: LabelProps) => {
  return (
    <div className={`text-sm text-slate-300 ${className}`}>{children}</div>
  );
};

Label.defaultProps = {
  className: '',
};

export default Label;
