import classNames from "classnames";
import React from "react";

export interface SectionProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  hasPadding?: boolean;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ children, title, className, hasPadding = true }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          className
        )}
      >
        {title && (
          <h1 className="uppercase text-2xl font-semibold mb-4">{title}</h1>
        )}

        {children}
      </div>
    );
  }
);

Section.displayName = "Section";

export default React.memo(Section);
