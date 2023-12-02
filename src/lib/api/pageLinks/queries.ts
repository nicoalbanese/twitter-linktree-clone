import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type PageLinkId, pageLinkIdSchema, pageLinks } from "@/lib/db/schema/pageLinks";
import { pages } from "@/lib/db/schema/pages";

export const getPageLinks = async () => {
  const { session } = await getUserAuth();
  const p = await db.select({ pageLink: pageLinks, page: pages }).from(pageLinks).leftJoin(pages, eq(pageLinks.pageId, pages.id)).where(eq(pageLinks.userId, session?.user.id!));
  return { pageLinks: p };
};

export const getPageLinkById = async (id: PageLinkId) => {
  const { session } = await getUserAuth();
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  const [p] = await db.select().from(pageLinks).where(and(eq(pageLinks.id, pageLinkId), eq(pageLinks.userId, session?.user.id!))).leftJoin(pages, eq(pageLinks.pageId, pages.id));
  return { pageLink: p };
};

