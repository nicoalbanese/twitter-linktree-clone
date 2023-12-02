import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto md:p-0 px-4 mt-4">{children}</main>
    </div>
  );
}
