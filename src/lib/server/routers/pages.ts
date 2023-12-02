import { getPageById, getPages } from "@/lib/api/pages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  pageIdSchema,
  insertPageParams,
  updatePageParams,
  pages,
} from "@/lib/db/schema/pages";
import { createPage, deletePage, updatePage } from "@/lib/api/pages/mutations";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { pageLinks } from "@/lib/db/schema/pageLinks";

export const pagesRouter = router({
  getPages: publicProcedure.query(async () => {
    return getPages();
  }),
  getPageById: publicProcedure.input(pageIdSchema).query(async ({ input }) => {
    return getPageById(input.id);
  }),
  getPageBySlugWithLinks: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const p = await ctx.db
        .select()
        .from(pages)
        .where(eq(pages.slug, input.slug))
        .innerJoin(pageLinks, eq(pageLinks.pageId, pages.id));
      return p;
    }),

  createPage: publicProcedure
    .input(insertPageParams)
    .mutation(async ({ input }) => {
      return createPage(input);
    }),
  updatePage: publicProcedure
    .input(updatePageParams)
    .mutation(async ({ input }) => {
      return updatePage(input.id, input);
    }),
  deletePage: publicProcedure
    .input(pageIdSchema)
    .mutation(async ({ input }) => {
      return deletePage(input.id);
    }),
});
