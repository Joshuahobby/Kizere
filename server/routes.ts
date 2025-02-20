import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertVolunteerSchema, insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Volunteer signup endpoint
  app.post("/api/volunteers", async (req, res) => {
    try {
      const data = insertVolunteerSchema.parse(req.body);
      const volunteer = await storage.createVolunteer(data);
      res.json(volunteer);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
