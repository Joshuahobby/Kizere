import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { 
  insertVolunteerSchema, insertContactSchema,
  insertNewsSchema, insertPartnerSchema, insertActivitySchema,
  insertNewsletterSchema, insertEventSchema
} from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Auth endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  });
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

  // News & Updates endpoints
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const data = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(data);
      res.json(news);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Partners endpoints
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAllPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  app.post("/api/partners", async (req, res) => {
    try {
      const data = insertPartnerSchema.parse(req.body);
      const partner = await storage.createPartner(data);
      res.json(partner);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Activities endpoints
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getAllActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getActivity(Number(req.params.id));
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const data = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(data);
      res.json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);

      // Check if already subscribed
      const existing = await storage.getNewsletterSubscription(data.email);
      if (existing) {
        return res.status(400).json({ 
          message: "This email is already subscribed to our newsletter" 
        });
      }

      const subscription = await storage.createNewsletterSubscription(data);
      res.json(subscription);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Events endpoints
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(Number(req.params.id));
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const data = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(data);
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/events/:id/register", async (req, res) => {
    try {
      const event = await storage.updateEventParticipants(Number(req.params.id), true);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Failed to register for event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}