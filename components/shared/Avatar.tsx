import React, { useState } from "react";
import Image from "@/components/shared/Image";
import classNames from "classnames";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, className, ...props }) => {
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const handleImageError = () => {
    setIsLoadFailed(true);
  };

  return (
    <div
      className={classNames(
        "rounded-full",
        className
      )}
      {...props}
    >
      <Image
        onError={handleImageError}
        src={isLoadFailed || !src ? "/fallback_profile.png" : src}
        alt="avatar"
        className="rounded-full border border-primary"
        width={"50"}
        height={"50"}
      />
    </div>
  );
};

export default React.memo(Avatar);