import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { 
  volunteers, contactMessages, newsUpdates, partners, activities,
  newsletterSubscriptions 
} from "@shared/schema";
import type { 
  InsertVolunteer, Volunteer, 
  InsertContact, Contact,
  InsertNews, News,
  InsertPartner, Partner,
  InsertActivity, Activity,
  InsertNewsletter, Newsletter
} from "@shared/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export interface IStorage {
  // Volunteers
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;

  // Contact Messages
  createContactMessage(message: InsertContact): Promise<Contact>;

  // News & Updates
  getAllNews(): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;

  // Partners
  getAllPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;

  // Activities
  getAllActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Newsletter Subscriptions
  createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscription(email: string): Promise<Newsletter | undefined>;
}

export class PostgresStorage implements IStorage {
  // Volunteers
  async createVolunteer(insertVolunteer: InsertVolunteer): Promise<Volunteer> {
    const [volunteer] = await db.insert(volunteers)
      .values(insertVolunteer)
      .returning();
    return volunteer;
  }

  // Contact Messages
  async createContactMessage(insertMessage: InsertContact): Promise<Contact> {
    const [message] = await db.insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  // News & Updates
  async getAllNews(): Promise<News[]> {
    return await db.select().from(newsUpdates).orderBy(newsUpdates.publishedAt);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [news] = await db.insert(newsUpdates)
      .values(insertNews)
      .returning();
    return news;
  }

  // Partners
  async getAllPartners(): Promise<Partner[]> {
    return await db.select().from(partners);
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const [partner] = await db.insert(partners)
      .values(insertPartner)
      .returning();
    return partner;
  }

  // Activities
  async getAllActivities(): Promise<Activity[]> {
    return await db.select()
      .from(activities)
      .orderBy(activities.date);
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    const [activity] = await db.select()
      .from(activities)
      .where(eq(activities.id, id));
    return activity;
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db.insert(activities)
      .values(insertActivity)
      .returning();
    return activity;
  }

  // Newsletter Subscriptions
  async createNewsletterSubscription(insertSubscription: InsertNewsletter): Promise<Newsletter> {
    const [subscription] = await db.insert(newsletterSubscriptions)
      .values({
        email: insertSubscription.email,
        name: insertSubscription.name ?? null,
        status: insertSubscription.status ?? 'active',
        subscribedAt: new Date().toISOString()
      })
      .returning();
    return subscription;
  }

  async getNewsletterSubscription(email: string): Promise<Newsletter | undefined> {
    const [subscription] = await db.select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return subscription;
  }
}

export const storage = new PostgresStorage();