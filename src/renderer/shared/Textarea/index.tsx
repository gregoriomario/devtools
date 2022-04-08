/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef, useState } from 'react';
import Alert from '../Alert';
import ButtonShare from '../Button/ButtonShare';
import Label from '../Label';

type TextareaProps = {
  className?: string;
  copy?: string;
  label?: string;
  type?: 'light' | 'dark';
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ copy, className, label, type, ...args }, ref) => {
    const [copied, setCopied] = useState(false);
    return (
      <div className="h-full flex flex-col">
        {label && <Label className="mb-1">{label}</Label>}
        <div className="relative h-full">
          <textarea
            {...args}
            ref={ref}
            className={`text-slate-900 text-sm rounded-md h-full w-full focus:ring-0 ${className}`}
          />
          {copy && (
            <ButtonShare
              className="absolute top-2 right-2 hover:scale-105 bg-slate-700 !border-0"
              onClick={() => {
                navigator.clipboard
                  .writeText(copy)
                  .then(() => {
                    setCopied(true);
                    return setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  })
                  .catch(() => {
                    return null;
                  });
              }}
            />
          )}
          <div
            className={`absolute opacity-0 flex bottom-0 w-full justify-center items-center ${
              copied && 'animate-pop'
            }`}
          >
            <Alert className="relative">Copied to Clipboard</Alert>
          </div>
        </div>
      </div>
    );
  }
);

Textarea.defaultProps = {
  className: '',
  copy: '',
  label: '',
  type: 'light',
};

export default Textarea;
