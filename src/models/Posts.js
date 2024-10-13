// src/models/Posts.js:
import { DataTypes, Model } from "sequelize";

class Posts extends Model {
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
        description:{
            type: DataTypes.STRING
        },
        content:{
            type:DataTypes.JSON
        },
        date:{
            type: DataTypes.STRING
        },
        url_picture:{
            type:DataTypes.STRING
        },
        first_screen:{
          type: DataTypes.INTEGER
        }
      }, // attributes
      {
        sequelize,// Opcional: nombre de la tabla en la base de datos
        timestamps: true,
      }
    );

    return this;
  }
  static associate(models) {
    // Un Curso pertenece a un Usuario
    this.belongsTo(models.TipoPosts,{foreignKey:'TipoPostsId'});
    this.hasMany(models.ScreenPosts,{foreignKey:'PostsId'});
  }
}

export default Posts;
