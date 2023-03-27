import Sidebar from "@/components/features/DashboardSidebar";

export default async function BlogLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="max-w-6xl mx-auto my-10">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-6">{children}</div>
        </div>
      </main>
    )
  }