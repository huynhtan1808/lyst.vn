import Section, { SectionProps } from "@/components/shared/Section";
import React from "react";

interface UploadContainerProps extends SectionProps {
  isVerified?: boolean;
}

const UploadContainer: React.FC<UploadContainerProps> = ({
  isVerified,
  children,
  ...props
}) => {
  return (
    <Section {...props}>
      {!isVerified ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
          <p className="text-center text-2xl">
            Bạn cần phải{" "}
            <a
              href="/"
              className="hover:underline text-primary-300"
              target="_blank"
              rel="noreferrer"
            >
              đăng ký
            </a>{" "}
            để được đăng bài.
          </p>
        </div>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </Section>
  );
};

export default UploadContainer;
