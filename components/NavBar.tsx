"use client"

import HeaderProfile from "@/components/shared/HeaderProfile";
import Link from 'next/link';
import { useUser } from "@/contexts/AuthContext";
import Button from "@/components/shared/Button"



type Props = {};

type NavLinkProps = {
  title: string;
  href: string;
};

export const NavLink = ({ title, href }: NavLinkProps) => {

  return (
    <Link href={href}>
      <div
        className={`font-semibold px-2 py-1 hover:text-green-500`}
      >
        {title}
      </div>
    </Link>
  );
};

const Navbar = (props: Props) => {
  const {user} = useUser();


  // links
  const links: NavLinkProps[] = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Cho thuê",
      href: "/blog",
    },
  ];

  return (
    <div className="shadow">
      <div className="max-w-6xl mx-auto py-1 px-4">
        <nav className="sticky-nav flex flex-row justify-between">
        <div className="flex items-center space-x-3">
        <svg id="svgLogo" xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" viewBox="-10 0 80 65">
            <path className="bottomArrow" d="M32.59 36.14 32.59 32 29.12 32 25.42 32 25.42 36.32 25.42 42.4 25.42 54.52 23.33 53.31 14.87 48.42 6.28 43.48 6.28 50.47 13.52 54.65 20.93 58.92 21.04 58.99 29.36 63.8 36.58 59.62 36.78 59.51 45.18 54.65 51.95 50.74 51.95 43.33 32.59 54.51 32.59 42.34 32.59 36.14"/>
            <path className="leftArrow" d="M9.62,40.75V23.69h0l8.23-4.75,14.56-8.45,5.71,3.29-8.89,5.13L21,23.69,18.6,25.05h0l10.19,5.86L32.44,33v7.7l-1-.57-5.89-3.41-10.1-5.83h0V53.44L9.59,50.08V40.75Z" transform="translate(-9.59 -10.49)"/>
            <path className="rightArrow" d="M67.8,40.75V23.69h0l-8.21-4.78L45,10.49,39.3,13.78l8.89,5.13,8.27,4.78,2.36,1.36h0L48.63,30.91,45,33v7.7l1-.57,5.89-3.41L62,30.91h0V53.44l5.82-3.36V40.75Z" transform="translate(-9.59 -10.49)"/>
        </svg>
        {/* nav links */}
        {links.map((link, index) => (
          <NavLink key={index} title={link.title} href={link.href} />
        ))}
      </div>
      <div className="flex items-center space-x-2">
      
      {user ? (
          <HeaderProfile />
        ) : (
          <div className="flex items-center space-x-2">
            <Link href={"/login"}>
                <Button className="">
                  <p className="line-clamp-1">Đăng nhập</p>
                </Button>
            </Link>
          </div>
        )}
      </div>
      </nav>
      </div>
    </div>
  );
}

export default Navbar;
