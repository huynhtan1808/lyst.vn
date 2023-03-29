'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import classNames from 'classnames';
import Profile from './Profile';
import Button from './Button';
import TextIcon from './TextIcon';

const navItems = {
  '/': {
    name: 'Trang chủ',
  },
  '/blog': {
    name: 'Khám phá',
  },
  '/dashboard': {
    name: 'Hồ sơ',
  },
};

function Logo() {
  return (
    <Link aria-label="Lyst.vn" href="/">
      <motion.svg
        className="text-black dark:text-white h-[25px] md:h-[37px]"
        width="25"
        height="37"
        viewBox="0 0 232 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M39 316V0"
          stroke="#000"
          strokeWidth={78}
        />
        <motion.path
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M232 314.998H129.852L232 232.887V314.998Z"
          fill="#000"
        />
      </motion.svg>
    </Link>
  );
}

export default function LeftSidebar() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="text-lg col-span-1 border-r border-gray-200">
      <div className="lg:fixed flex flex-col md:h-full md:w-[260px] justify-between px-6 py-6">
        <div>
          <div className="px-3 py-2 md:mb-8 space-y-10">
            <Logo />
          </div>
          <nav
            className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0"
            id="nav"
          >
            <div className="flex flex-row md:flex-col space-x-0 mb-2 mt-2 md:mt-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={classNames(
                      'transition-all hover:text-primary flex align-middle',
                      {
                        'text-gray-900': !isActive,
                        'font-bold text-primary': isActive,
                      }
                    )}
                  >
                    <span className="relative py-[5px] px-[10px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 rounded-md z-[-1]"
                          layoutId="sidebar"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link href={"/dashboard/post/add"} className="mt-8">
              <Button primary>
                <TextIcon>Đăng tin</TextIcon>
              </Button>
            </Link>
          </nav>
        </div>
        <div><Profile/></div>
      </div>
    </aside>
  );
}