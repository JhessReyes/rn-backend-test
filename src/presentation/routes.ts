import { Router } from "express";

export class AppRouter {
  public static get routes() {
    const router: Router = Router();

    // Get Teams
    router.get("/api/v1/teams", async (req, res) => {
      res.send("Teams");
    });

    // Create Team
    router.post("/api/v1/teams", async (req, res) => {
      if (!req.body) res.json({ error: "No body provided" });
      if (!req.body.name) res.json({ error: "No team name provided" });
      if (!req.body.superheroes) res.json({ error: "No superheros provided" });

      res.send("Teams");
    });

    // Delete Team
    router.delete("/api/v1/teams", async (req, res) => {
      if (!req.body.id) res.json({ error: "No team id provided" });
      res.send("Teams");
    });

    // Add Favorite Superhero
    router.post("/api/v1/add-favorite", async (req, res) => {
      if (!req.body.id) res.json({ error: "No superhero id provided" });
    
      res.send("Add Favorite");
    });

    // Delete Favorite Superhero
    router.delete("/api/v1/delete-favorite", async (req, res) => {
      if (!req.body.id) res.json({ error: "No superhero id provided" });
    });

    return router;
  }
}
