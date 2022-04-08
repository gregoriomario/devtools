import React from "react";

type FlexColProps = {
  children: React.ReactNode;
  className?: string;
  gap?: "small" | "medium" | "large" | "none";
};

const FlexCol = ({ children = "", className, gap }: FlexColProps) => {
  let GAP;
  switch (gap) {
    case "small":
      GAP = "gap-y-1";
      break;
    case "medium":
      GAP = "gap-y-3";
      break;
    case "large":
      GAP = "gap-y-6";
      break;
    case "none":
      GAP = "";
      break;
    default:
      GAP = "gap-y-3";
      break;
  }
  return (
    <div className={`relative flex flex-col ${GAP} ${className}`}>
      {children}
    </div>
  );
};

export default FlexCol;
