'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import classNames from 'classnames';
import Profile from './Profile';

const navItems = {
  '/': {
    name: 'Feed',
  },
  '/blog': {
    name: 'Blog',
  },
  '/dashboard': {
    name: 'Dashboard',
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
    <aside className="md:w-[250px] md:min-h-screen border-r border-gray-200 md:flex-shrink-0 md:mx-0 md:px-0">
      <div className="lg:fixed flex flex-row md:flex-col justify-between">
        <div>
        <div className="mb-2 px-4 py-2 md:mb-8 space-y-10 flex flex-col md:flex-row items-start">
          <Logo />
        </div>
        <nav
            className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
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
                      'transition-all hover:text-orange-500 flex align-middle',
                      {
                        'text-gray-900': !isActive,
                        'font-bold text-orange-600': isActive,
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
          </nav>
        </div>
        <div><Profile/></div>
      </div>
    </aside>
  );
}