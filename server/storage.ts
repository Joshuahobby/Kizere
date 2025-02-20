import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  volunteers, contactMessages, newsUpdates, partners, activities 
} from "@shared/schema";
import type { 
  InsertVolunteer, Volunteer, 
  InsertContact, Contact,
  InsertNews, News,
  InsertPartner, Partner,
  InsertActivity, Activity
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
      .where(activities.id.equals(id));
    return activity;
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db.insert(activities)
      .values(insertActivity)
      .returning();
    return activity;
  }
}

export const storage = new PostgresStorage();