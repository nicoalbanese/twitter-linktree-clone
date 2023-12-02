import { varchar, boolean, serial, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getPages } from "@/lib/api/pages/queries";

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  public: boolean("public").notNull().default(false),
  slug: varchar("slug", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for pages - used to validate API requests
export const insertPageSchema = createInsertSchema(pages);

export const insertPageParams = createSelectSchema(pages, {
  public: z.coerce.boolean(),
  slug: z.string().min(3),
}).omit({
  id: true,
  userId: true,
});

export const updatePageSchema = createSelectSchema(pages);

export const updatePageParams = createSelectSchema(pages, {
  public: z.coerce.boolean(),
}).omit({
  userId: true,
});

export const pageIdSchema = updatePageSchema.pick({ id: true });

// Types for pages - used to type API request params and within Components
export type Page = z.infer<typeof updatePageSchema>;
export type NewPage = z.infer<typeof insertPageSchema>;
export type NewPageParams = z.infer<typeof insertPageParams>;
export type UpdatePageParams = z.infer<typeof updatePageParams>;
export type PageId = z.infer<typeof pageIdSchema>["id"];

// this type infers the return from getPages() - meaning it will include any joins
export type CompletePage = Awaited<
  ReturnType<typeof getPages>
>["pages"][number];
