import Sidebar from "@/components/shared/LeftSidebar";

export default async function BlogLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main>{children}</main>
    )
  }