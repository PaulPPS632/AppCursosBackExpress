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
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        verifiedWebsite: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        timestamps: false,
        tableName: "Entidad",
        hooks: {
          beforeCreate: async (Entidad) => {
            if (Entidad.password) {
              const salt = await bcrypt.genSalt(10);
              Entidad.password = await bcrypt.hash(Entidad.password, salt);
            }
          },
          beforeUpdate: async (Entidad) => {
            if (Entidad.changed("password") && Entidad.password) {
              const salt = await bcrypt.genSalt(10);
              Entidad.password = await bcrypt.hash(Entidad.password, salt);
            }
          },
        },
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

  static async comparePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }

}

export default Entidad;
