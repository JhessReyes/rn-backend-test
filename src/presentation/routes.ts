import { Router } from "express";
import path from "path";
import { SequelizeDatabase } from "../database/database";

export class AppRouter {
  public static routes(db: SequelizeDatabase) {
    const router: Router = Router();
    router.get("/", (_req: any, res: any) => {
      const filePath = path.join(process.cwd(), "public", "page.html");
      res.sendFile(filePath);
    });
    // Get Teams
    router.get("/api/v1/teams", async (req, res) => {
      const teams = await db.Team.findAll();
      return res.json({
        message: "Teams",
        teams,
      });
    });

    // Create Team
    router.post("/api/v1/team", async (req, res) => {
      if (!req.body) res.json({ error: "No body provided" });
      if (!req.body.name) res.json({ error: "No team name provided" });

      const _team = await db.Team.create({
        name: req.body.name,
      });

      const team = _team.toJSON();
      return res.json({
        message: "Team created",
        team,
      });
    });

    // Delete Team
    router.delete("/api/v1/team/:id", async (req, res) => {
      if (!req.params.id) res.json({ error: "No team id provided" });
      const { id } = req.params;

      try {
        const _team = await db.Team.findByPk(id);
        if (!_team) return res.json({ error: "Team not found" });
        await _team.destroy();

        const team = _team.toJSON();
        return res.json({ message: "Team deleted successfully", team });
      } catch (error) {
        return res.json({ error: "Error deleting team", trace: error });
      }
    });

    // Add Team Member
    router.post("/api/v1/add-team-member", async (req, res) => {
      if (!req.body.teamId) res.json({ error: "No team id provided" });
      if (!req.body.superhero) res.json({ error: "No superhero provided" });
      if (!req.body.superhero.id)
        res.json({ error: "No superhero id provided" });

      const { teamId, superhero } = req.body;
      const { id } = superhero;
      const superheroId = id.toString();
      try {
        const _team = await db.Team.findByPk(teamId);
        if (!_team) return res.json({ error: "Team not found" });
        const team = _team.toJSON();

        const _superhero = await db.TeamMember.findOne({
          where: {
            superheroId,
          },
        });

        if (_superhero) return res.json({ error: "Superhero already added" });

        const _teamMember = await db.TeamMember.create({
          teamId,
          superheroId,
        });

        const teamMember = _teamMember.toJSON();

        return res.json({
          message: "Team member added",
          team,
          teamMember,
        });
      } catch (error) {
        return res.json({ error: "Error adding team member", trace: error });
      }
    });

    // Delete Team Member
    router.delete("/api/v1/delete-team-member/:id", async (req, res) => {
      if (!req.params.id) res.json({ error: "No team member id provided" });
      const { id } = req.params;

      try {
        const _teamMember = await db.TeamMember.findByPk(id);
        if (!_teamMember) return res.json({ error: "Team member not found" });
        const teamMember = _teamMember.toJSON();
        await _teamMember.destroy();

        return res.json({
          message: "Team member deleted successfully",
          teamMember,
        });
      } catch (error) {
        return res.json({ error: "Error deleting team member", trace: error });
      }
    });

    // Get Favorites Superhero
    router.get("/api/v1/favorites", async (req, res) => {
      const favorites = await db.Favorite.findAll();
      return res.json({
        message: "Favorites",
        favorites,
      });
    });

    // Add Favorite Superhero
    router.post("/api/v1/switch-favorite", async (req, res) => {
      if (!req.body.superhero) res.json({ error: "No superhero id provided" });
      if (!req.body.superhero.id)
        res.json({ error: "No superhero id provided" });

      const { superhero } = req.body;
      const { id } = superhero;
      const superheroId = id.toString();

      try {
        const _favorite = await db.Favorite.findOne({
          where: {
            superheroId,
          },
        });

        if (_favorite) {
          await db.Favorite.destroy({
            where: {
              superheroId,
            },
          });
        } else {
          await db.Favorite.create({
            superheroId,
            superhero,
          });
        }

        return res.json({
          message: "Favorite switched",
        });
      } catch (error) {
        console.log("Error", error);
        return res.json({ error: "Error adding favorite", trace: error });
      }
    });

    return router;
  }
}
