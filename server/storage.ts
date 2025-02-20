import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { volunteers, contactMessages } from "@shared/schema";
import type { InsertVolunteer, Volunteer, InsertContact, Contact } from "@shared/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export interface IStorage {
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  createContactMessage(message: InsertContact): Promise<Contact>;
}

export class PostgresStorage implements IStorage {
  async createVolunteer(insertVolunteer: InsertVolunteer): Promise<Volunteer> {
    const [volunteer] = await db.insert(volunteers)
      .values(insertVolunteer)
      .returning();
    return volunteer;
  }

  async createContactMessage(insertMessage: InsertContact): Promise<Contact> {
    const [message] = await db.insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new PostgresStorage();