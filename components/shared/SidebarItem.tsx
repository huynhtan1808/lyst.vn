import React, { useCallback } from 'react';
import classNames from 'classnames';
import { IconType } from "react-icons";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  alert?: boolean;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick, alert, className }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, onClick]);

  return (
    <div onClick={handleClick} className={classNames(className)}>
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} color="primary" />
        {alert ? <BsDot className="text-primary absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="primary" />
        <p className="hidden lg:block text-primary text-xl">
          {label}
        </p>
        {alert ? <BsDot className="text-primary absolute -top-4 left-0" size={70} /> : null}
      </div>
    </div>
  );
}

export default SidebarItem;