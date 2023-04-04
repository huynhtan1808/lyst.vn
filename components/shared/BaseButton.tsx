import classNames from "classnames";
import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface BaseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  LeftIcon?: React.ComponentType<{ className: string }>;
  RightIcon?: React.ComponentType<{ className: string }>;
  iconClassName?: string;
  primary?: boolean;
  outline?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => void;
  shortcutKey?: string;
  isLoading?: boolean;
  label: string;
}

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    const {
      className,
      iconClassName,
      LeftIcon,
      RightIcon,
      primary = false,
      outline = false,
      disabled = false,
      children,
      onClick,
      shortcutKey,
      isLoading,
      label,
      ...rest
    } = props;

    // If class name contains 'w-' or 'h-' then override default className
    const iconClass =
      !iconClassName?.includes("w-") || !iconClassName?.includes("h-")
        ? classNames("w-6 h-6", iconClassName)
        : iconClassName;

    let buttonClassName;

    if (primary) {
      if (outline) {
        buttonClassName = "border-2 border-primary";
      } else {
        buttonClassName = "bg-primary";
      }
    } else {
      if (outline) {
        buttonClassName = "bg-gray-100 border-solid border-1 border-gray-200 shadow";
      } else {
        buttonClassName = "bg-transparent";
      }
    }

    return (
      <button
        type="button"
        className={classNames(
          "transition duration-300",
          (isLoading || disabled) && "text-gray-300 cursor-not-allowed",
          className,
          buttonClassName,
          (LeftIcon || RightIcon || isLoading) && "gap-x-2"
        )}
        onClick={(e) => {
          if (disabled) return;

          onClick?.(e);
        }}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters
            className={classNames(iconClass, "animate-spin")}
          />
        ) : (
          LeftIcon && <LeftIcon className={iconClass} />
        )}
        {children}
        {RightIcon && <RightIcon className={iconClass} />}
        {label}
      </button>
    );
  }
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
