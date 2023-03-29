"use client"

import classNames from "classnames";
import React from "react";
import BaseButton, { BaseButtonProps } from "@/components/shared/BaseButton";

interface ButtonProps extends BaseButtonProps {
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  secondary,
  ...props
}) => {
  return (
    <BaseButton
      type="button"
      className={classNames(
        "text-base flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-opacity-80",
        className,
        props.primary && "text-white bg-primary hover:bg-secondary",
        secondary && "bg-secondary"
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
