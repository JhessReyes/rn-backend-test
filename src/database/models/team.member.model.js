import { Model, DataTypes } from "sequelize";

export class TeamMember extends Model {
    static associate(models) {
        // define association here
        models.TeamMember.belongsTo(models.Team, {
            constraints: false,
            as: 'team',
            foreignKey: 'teamId'
        });
    }
}

export default (sequelize) => {
    TeamMember.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            teamId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            superheroId: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            superhero: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            sequelize,
            modelName: 'TeamMember',
            tableName: 'tb_team_member',
            paranoid: false,
            timestamps: true,
        }

    )

    return TeamMember;

}