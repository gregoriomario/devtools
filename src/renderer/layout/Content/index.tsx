import React from "react";

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

export default Content;
