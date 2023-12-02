import { varchar, integer, serial, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pages } from "./pages"
import { getPageLinks } from "@/lib/api/pageLinks/queries";

export const pageLinks = pgTable('page_links', {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
  pageId: integer("page_id").references(() => pages.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});


// Schema for pageLinks - used to validate API requests
export const insertPageLinkSchema = createInsertSchema(pageLinks);

export const insertPageLinkParams = createSelectSchema(pageLinks, {
  pageId: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updatePageLinkSchema = createSelectSchema(pageLinks);

export const updatePageLinkParams = createSelectSchema(pageLinks,{
  pageId: z.coerce.number()
}).omit({ 
  userId: true
});

export const pageLinkIdSchema = updatePageLinkSchema.pick({ id: true });

// Types for pageLinks - used to type API request params and within Components
export type PageLink = z.infer<typeof updatePageLinkSchema>;
export type NewPageLink = z.infer<typeof insertPageLinkSchema>;
export type NewPageLinkParams = z.infer<typeof insertPageLinkParams>;
export type UpdatePageLinkParams = z.infer<typeof updatePageLinkParams>;
export type PageLinkId = z.infer<typeof pageLinkIdSchema>["id"];
    
// this type infers the return from getPageLinks() - meaning it will include any joins
export type CompletePageLink = Awaited<ReturnType<typeof getPageLinks>>["pageLinks"][number];

