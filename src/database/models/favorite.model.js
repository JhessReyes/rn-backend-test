import { Model, DataTypes } from "sequelize";

export class Favorite extends Model {
    static associate(models) {
        // define association here
    }
}

export default (sequelize) => {
    Favorite.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
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
            modelName: 'Favorite',
            tableName: 'tb_favorite',
            paranoid: false,
            timestamps: true,
        }
    )

    return Favorite;
}