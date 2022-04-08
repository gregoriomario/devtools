import React from "react";
import Content from ".";

type GridType = "row" | "col";
type Gap = "x" | "y";

type GapScale =
  | `gap-${Gap}-0`
  | `gap-${Gap}-1`
  | `gap-${Gap}-2`
  | `gap-${Gap}-3`
  | `gap-${Gap}-4`
  | `gap-${Gap}-5`;
type GridScale =
  | `grid-${GridType}s-1`
  | `grid-${GridType}s-2`
  | `grid-${GridType}s-3`
  | `grid-${GridType}s-4`
  | `grid-${GridType}s-5`
  | `grid-${GridType}s-6`
  | `grid-${GridType}s-7`
  | `grid-${GridType}s-8`
  | `grid-${GridType}s-9`
  | `grid-${GridType}s-10`
  | `grid-${GridType}s-11`
  | `grid-${GridType}s-12`;

type GridProps = {
  children: React.ReactNode;
  col?: GridScale;
  row?: GridScale;
  gapX?: GapScale;
  gapY?: GapScale;
  flow?: `grid-flow-${GridType}`;
  className?: string;
};

const Grid = ({
  children,
  col = "grid-cols-1",
  row = "grid-rows-1",
  gapX = "gap-x-0",
  gapY = "gap-y-0",
  flow = `grid-flow-row`,
  className = "",
}: GridProps) => {
  return (
    <Content
      className={`grid w-full h-full ${col} ${row} ${gapX} ${gapY} ${flow} ${className}`}
    >
      {children}
    </Content>
  );
};

export default Grid;
