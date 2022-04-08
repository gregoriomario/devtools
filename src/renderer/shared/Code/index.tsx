/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import ReactCodeMirror, {
  ReactCodeMirrorProps,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import Label from '../Label';
import ButtonShare from '../Button/ButtonShare';
import Alert from '../Alert';
import Content from '../../layout/Content';

type CodeProps = {
  code: string;
  language: string;
  label?: string;
  copy?: boolean;
  className?: string;
} & ReactCodeMirrorProps;

const Code = React.forwardRef<ReactCodeMirrorRef, CodeProps>(
  ({ copy, code, language, label, className, ...args }: CodeProps, ref) => {
    const [content, setContent] = useState('');
    const [copied, setCopied] = React.useState(false);
    const [showCopy, setShowCopy] = React.useState(false);
    const [h, setH] = useState(window.innerHeight - 150);

    let LANGUAGE;
    switch (language) {
      case 'json':
        LANGUAGE = json();
        break;
      case 'yaml' || 'yml':
        LANGUAGE = markdown();
        break;
      default:
        LANGUAGE = json();
    }

    const handleResize = () => {
      setH(window.innerHeight - 150);
    };

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    useEffect(() => {
      setContent(code);
    }, [code]);
    return (
      <Content className="h-full">
        {label && <Label className="mb-1">{label}</Label>}
        <pre
          className="relative w-full h-fit overflow-scroll !m-0 rounded-md"
          onMouseEnter={() => {
            setShowCopy(true);
          }}
          onMouseLeave={() => {
            setShowCopy(false);
          }}
        >
          <ReactCodeMirror
            {...args}
            id="code"
            value={content}
            height={`${h}px`}
            className={`relative w-full overflow-y-scroll rounded-md md:text-md ${className}`}
            ref={ref}
            theme={oneDark}
            lang="json"
            extensions={[LANGUAGE]}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                navigator.clipboard
                  .readText()
                  .then((res) => {
                    setContent((prev) => prev + res);
                    return null;
                  })
                  .catch(() => {
                    return null;
                  });
              }
              if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                const selection = window.getSelection();
                if (selection?.type === 'Range') {
                  const range = selection.getRangeAt(0);
                  const selectedText = range.toString();
                  navigator.clipboard.writeText(selectedText).catch(() => {
                    return null;
                  });
                }
              }
            }}
          />

          {copy && showCopy && (
            <ButtonShare
              className="absolute top-2 right-2 hover:scale-105 bg-slate-700 !border-0"
              onMouseEnter={() => {
                setShowCopy(true);
              }}
              onClick={() => {
                navigator.clipboard
                  .writeText(code)
                  .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                    return null;
                  })
                  .catch(() => {
                    return null;
                  });
              }}
            />
          )}
          <Content
            className={`absolute opacity-0 flex bottom-0 w-full justify-center items-center ${
              copied && 'animate-pop'
            }`}
          >
            {' '}
            <Alert className="relative">Copied to Clipboard</Alert>
          </Content>
        </pre>
      </Content>
    );
  }
);

Code.defaultProps = {
  copy: true,
  label: '',
  className: '',
};

export default Code;
