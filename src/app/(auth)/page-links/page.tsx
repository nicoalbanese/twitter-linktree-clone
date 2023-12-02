import PageLinkList from "@/components/pageLinks/PageLinkList";
import NewPageLinkModal from "@/components/pageLinks/PageLinkModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function PageLinks() {
  await checkAuth();
  const { pageLinks } = await api.pageLinks.getPageLinks.query();  

  return (
    <main className="max-w-3xl mx-auto p-4 rounded-lg bg-card">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Page Links</h1>
        <NewPageLinkModal />
      </div>
      <PageLinkList pageLinks={pageLinks} />
    </main>
  );
}
