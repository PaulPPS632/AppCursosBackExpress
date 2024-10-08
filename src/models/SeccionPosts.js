import { DataTypes, Model } from "sequelize";

class SeccionPosts extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false, // Puedes configurar esto según tus necesidades
        },
        description: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.JSON,
        },
        date: {
          type: DataTypes.STRING,
        },
        url_picture: {
          type: DataTypes.STRING,
        },
        order: {
          type: DataTypes.INTEGER,
        },
        predecesor: {
          type: DataTypes.INTEGER,
        },
        sucesor: {
          type: DataTypes.INTEGER,
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
    this.belongsTo(models.ScreenPosts, { foreignKey: "ScreenPostsId" });
  }
}

export default SeccionPosts;
