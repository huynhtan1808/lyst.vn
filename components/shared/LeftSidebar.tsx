'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Profile from './Profile';
import SidebarItem from './SidebarItem';

import { AiOutlinePlusCircle, AiOutlineHome, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";





const items = [
  {
    icon: AiOutlineHome,
    label: 'Trang chủ',
    href: '/',
  },
  {
    icon: AiOutlineSearch,
    label: 'Khám phá',
    href: '/blog',
  },
  {
    icon: AiOutlineUser,
    label: 'Hồ sơ',
    href: `/dashboard`,
    auth: true,
  },
  {
    icon: AiOutlinePlusCircle,
    label: 'Đăng tin',
    href: `/dashboard/post/add`,
    auth: true,
  },
]

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

  return (
    <aside className="col-span-1 h-full pr-0 md:pr-6 border-r border-gray-200">
      <div className="flex flex-col fixed h-screen items-end justify-between py-4">
        <div className="space-y-2 lg:w-[230px]">
          <div className="p-4">
            <Logo/>
          </div>
            <nav id="nav">
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
                className="flex flex-row items-center"
              />
            ))}
            </nav>
        </div>
        <div className="space-y-2 lg:w-[230px]">
          <Profile/>
        </div>
      </div>
    </aside>
  );
}