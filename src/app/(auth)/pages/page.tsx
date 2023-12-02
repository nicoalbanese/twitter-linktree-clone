import PageList from "@/components/pages/PageList";
import NewPageModal from "@/components/pages/PageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Pages() {
  await checkAuth();
  const { pages } = await api.pages.getPages.query();  

  return (
    <main className="max-w-3xl mx-auto p-4 rounded-lg bg-card">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Pages</h1>
        <NewPageModal />
      </div>
      <PageList pages={pages} />
    </main>
  );
}
