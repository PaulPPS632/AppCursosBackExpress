// src/models/users/Entidad.js
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class Entidad extends Model {
    
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        // documento: DataTypes.STRING,
        direccion: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true,
        },
        localId: {
          type: DataTypes.STRING,
          allowNull: true,
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: "Entidad",
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Posts, {
      foreignKey: "EntidadId",
      as: "posts",
    });
    models.Posts.belongsTo(this, {
      foreignKey: "EntidadId",
      as: "entidad",
    });
  }
}

export default Entidad;
