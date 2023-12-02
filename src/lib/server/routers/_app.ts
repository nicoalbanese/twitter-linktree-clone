import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { pagesRouter } from "./pages";
import { pageLinksRouter } from "./pageLinks";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  pages: pagesRouter,
  pageLinks: pageLinksRouter,
});

export type AppRouter = typeof appRouter;
