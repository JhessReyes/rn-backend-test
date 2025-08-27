import pg from "pg";
import { Sequelize } from "sequelize";
import { initFavorite, initTeam, initTeamMember } from "./models";

interface Options {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
}

export class SequelizeDatabase {
  public sequelize!: Sequelize;
  public Team!: ReturnType<typeof initTeam>;
  public TeamMember!: ReturnType<typeof initTeamMember>;
  public Favorite!: ReturnType<typeof initFavorite>;
  public db: Record<string, any> = {};

  constructor(private options: Options) {}

  async init() {
    const { dbName, dbUser, dbPassword, dbHost, dbPort } = this.options;

    this.sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: "postgres",
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: false,
        },
      },
    });

    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");

      // Inicializa modelos
      this.Team = initTeam(this.sequelize);
      this.TeamMember = initTeamMember(this.sequelize);
      this.Favorite = initFavorite(this.sequelize);

      this.db = {
        Team: this.Team,
        TeamMember: this.TeamMember,
        Favorite: this.Favorite,
      };

      Object.keys(this.db).forEach((modelName) => {
        if (this.db[modelName].associate) {
          this.db[modelName].associate(this.db);
        }
      });

      // Agrega sequelize y Sequelize al objeto db para conveniencia
      this.db.sequelize = this.sequelize;
      this.db.Sequelize = Sequelize;

      return this.db;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }
}
