import { api } from "@/lib/trpc/api";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const p = await api.pages.getPageBySlugWithLinks.query({ slug: params.slug });
  if (p.length === 0) return notFound();
  const page = p[0].pages;
  if (page.public === false) return <main>This page is not public.</main>;
  const links = p.map((pageLinks) => pageLinks.page_links);
  return (
    <main>
      <div className="flex flex-col bg-[#708238] h-screen items-center justify-center py-8 px-4 text-center">
        <header className="mb-10">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mt-4 text-white">{page.title}</h1>
          <p className="text-white">{page.description}</p>
        </header>
        <nav className="flex-1 w-full max-w-md flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.id} href={link.url}>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-200 transition-all duration-300">
                <HomeIcon className="text-gray-500 w-5 h-5" />
                <span className="text-gray-800">{link.title}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
