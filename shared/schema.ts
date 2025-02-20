import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  interests: text("interests").notNull(),
  experience: text("experience").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull()
});

export const newsUpdates = pgTable("news_updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  imageUrl: text("image_url"),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
  website: text("website"),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact: text("impact").notNull(),
  imageUrl: text("image_url"),
  date: timestamp("date").defaultNow().notNull(),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  status: text("status").notNull().default('active'),
});

export const insertVolunteerSchema = createInsertSchema(volunteers).extend({
  email: z.string().email(),
  phone: z.string().min(10).max(20)
});

export const insertContactSchema = createInsertSchema(contactMessages).extend({
  email: z.string().email()
});

export const insertNewsSchema = createInsertSchema(newsUpdates);
export const updateNewsSchema = insertNewsSchema.partial();

export const insertPartnerSchema = createInsertSchema(partners);
export const updatePartnerSchema = insertPartnerSchema.partial();

export const insertActivitySchema = createInsertSchema(activities);
export const updateActivitySchema = insertActivitySchema.partial();

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional()
});

export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;
export type Volunteer = typeof volunteers.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactMessages.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof newsUpdates.$inferSelect;

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletterSubscriptions.$inferSelect;