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
        <div className="space-y-2">
          <p className="text-center">
            <a
              href="/login"
              className="hover:underline text-primary-300"
              target="_blank"
              rel="noreferrer"
            >
              Đăng ký ngay
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
