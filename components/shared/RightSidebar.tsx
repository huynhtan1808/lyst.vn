'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import { useUser } from '@/contexts/AuthContext';
import HeaderProfile from "@/components/shared/HeaderProfile";
import Button from "@/components/shared/Button"
import Footer from '@/components/partials/Footer';

export default function RightSidebar() {

  const {user} = useUser();

  return (
    <aside className="md:w-[250px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0">
      <div className="lg:sticky">
        <LayoutGroup>
          <nav
            className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row md:flex-col space-x-0 mb-2 mt-2 md:mt-0">
              {user ? (
              <HeaderProfile />
              ) : (
              <div className="flex items-center space-x-2">
                <Link href={"/login"}>
                    <Button primary>
                      <p className="line-clamp-1">Đăng nhập</p>
                    </Button>
                </Link>
              </div>
              )}
              </div>
          </nav>
          <div>
            <Footer />
          </div>
        </LayoutGroup>
      </div>
    </aside>
  );
}