
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import Link from 'next/link';


const Footer = () => {

  return (
    <div className="footer w-full flex flex-col mt-6 px-4 space-y-4 text-sm text-gray-400">
      <ul className="flex flex-wrap space-y-4 sm:space-y-0">
        <li>
            <Link href="/about" className="hover:text-gray-800">
                Về Lyst
            </Link>
        </li>
        
        <li>
            <Link href="/about" className="hover:text-gray-800">
                Liên hệ
            </Link>
        </li>
        
        <li>
            <Link href="/about" className="hover:text-gray-800">
                Hỗ trợ
            </Link>
        </li>

        <li>
            <Link href="/about" className="hover:text-gray-800">
                Điều khoản
            </Link>
        </li>

        <li>
            <Link href="/about" className="hover:text-gray-800">
                Bảo mật
            </Link>
        </li>

        </ul>
        <p className="text-sm text-gray-400">© 2023 LYST.VN</p>
    </div>
  );
};

export default Footer;
