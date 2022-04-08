import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button, { ButtonProps } from ".";

type ButtonShareProps = {
  className?: string;
} & ButtonProps;

const ButtonShare = ({ className, ...args }: ButtonShareProps) => {
  return (
    <Button className={className} {...args}>
      <FontAwesomeIcon icon={faClipboard} />
    </Button>
  );
};

export default ButtonShare;
