/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

type ContentProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, ...args }: ContentProps, ref) => {
    return (
      <div {...args} ref={ref}>
        {children}
      </div>
    );
  }
);

Content.defaultProps = {
  children: <></>,
};

export default Content;
