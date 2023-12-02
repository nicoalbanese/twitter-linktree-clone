import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type PageId, pageIdSchema, pages } from "@/lib/db/schema/pages";

export const getPages = async () => {
  const { session } = await getUserAuth();
  const p = await db.select().from(pages).where(eq(pages.userId, session?.user.id!));
  return { pages: p };
};

export const getPageById = async (id: PageId) => {
  const { session } = await getUserAuth();
  const { id: pageId } = pageIdSchema.parse({ id });
  const [p] = await db.select().from(pages).where(and(eq(pages.id, pageId), eq(pages.userId, session?.user.id!)));
  return { page: p };
};

