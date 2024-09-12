import { DataTypes, Model } from "sequelize";

class TipoPosts extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        descripcion: {
          type: DataTypes.STRING,
        },
      }, // attributes
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }
  static associate(models) {
    // Un Curso pertenece a un Usuario
    this.hasMany(models.Posts, { foreignKey: "TipoPostsId" });
  }
}

export default TipoPosts;
