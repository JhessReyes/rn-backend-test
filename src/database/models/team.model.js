import { Model, DataTypes } from "sequelize";

export class Team extends Model {
    static associate(models) {
        // define association here
        models.Team.hasMany(models.TeamMember, {
            constraints: false,
            as: 'members',
            foreignKey: 'teamId'
        });
    }
}

export default (sequelize) => {
    Team.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
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
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Team',
            tableName: 'tb_team',
            timestamps: true,
            paranoid: true,
        }
    )

    return Team;
}