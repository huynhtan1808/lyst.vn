export default async function BlogLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="max-w-6xl mx-auto my-10">
            {children}
      </main>
    )
  }