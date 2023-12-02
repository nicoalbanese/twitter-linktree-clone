import { getPageLinkById, getPageLinks } from "@/lib/api/pageLinks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  pageLinkIdSchema,
  insertPageLinkParams,
  updatePageLinkParams,
} from "@/lib/db/schema/pageLinks";
import { createPageLink, deletePageLink, updatePageLink } from "@/lib/api/pageLinks/mutations";

export const pageLinksRouter = router({
  getPageLinks: publicProcedure.query(async () => {
    return getPageLinks();
  }),
  getPageLinkById: publicProcedure.input(pageLinkIdSchema).query(async ({ input }) => {
    return getPageLinkById(input.id);
  }),
  createPageLink: publicProcedure
    .input(insertPageLinkParams)
    .mutation(async ({ input }) => {
      return createPageLink(input);
    }),
  updatePageLink: publicProcedure
    .input(updatePageLinkParams)
    .mutation(async ({ input }) => {
      return updatePageLink(input.id, input);
    }),
  deletePageLink: publicProcedure
    .input(pageLinkIdSchema)
    .mutation(async ({ input }) => {
      return deletePageLink(input.id);
    }),
});
