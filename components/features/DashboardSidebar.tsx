import React from "react";
import Link from "next/link";
import Button from "../shared/Button";
import TextIcon from "../shared/TextIcon";
import {AiOutlineEdit} from "react-icons/ai"

const Sidebar = () => {
  return (
    <div className="h-screen border-r border-gray-200">
      <div className="p-6">
        <ul className="text-gray-700">
        <li className="mb-2">
            <Link
              href={"/dashboard/post/add"}
              className="block"
            >
              <Button primary className="w-full">
                <TextIcon LeftIcon={AiOutlineEdit}>Đăng tin</TextIcon>
              </Button>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={"/dashboard"}
              className="block p-2 rounded hover:bg-gray-200"
            >
              Bảng điều khiển
            </Link>
          </li>
          <li className="mb-2">
            <Link href={"/dashboard/post"} className="block p-2 rounded hover:bg-gray-200">
              Tin đã đăng
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
