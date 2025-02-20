import { pgTable, text, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Extend volunteer table with authentication and profile fields
export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  interests: text("interests").notNull(),
  experience: text("experience").notNull(),
  status: text("status").notNull().default('active'),
  role: text("role").notNull().default('volunteer'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  profileImage: text("profile_image"),
  bio: text("bio"),
  skills: text("skills").array(),
  availableHours: text("available_hours"),
  totalHours: serial("total_hours").default(0),
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

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventType: text("event_type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: text("location").notNull(),
  maxParticipants: serial("max_participants").notNull(),
  currentParticipants: serial("current_participants").default(0),
  status: text("status").notNull().default('upcoming'),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVolunteerSchema = createInsertSchema(volunteers, {
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters").max(20),
  password: z.string().min(8, "Password must be at least 8 characters"),
  status: z.string().optional(),
  role: z.string().optional(),
  createdAt: z.date().optional(),
  lastLoginAt: z.date().optional(),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availableHours: z.string().optional(),
  totalHours: z.number().optional()
}).omit({ id: true });

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
  name: z.string().optional().nullable(), 
  status: z.string().optional(), 
  subscribedAt: z.string().optional() 
});

export const insertEventSchema = createInsertSchema(events, {
  eventType: z.enum(['health_camp', 'workshop', 'community_program', 'other']),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  maxParticipants: z.number().min(1),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).optional(),
  imageUrl: z.string().url().optional(),
}).omit({ id: true, currentParticipants: true, createdAt: true });

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

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;