import { sequelize } from "../database/database.js";
import Posts from "./Posts.js";
import ScreenPosts from "./ScreenPosts.js";
import SeccionPosts from "./SeccionPosts.js";
import TipoPosts from "./TipoPosts.js";

const models = {
  TipoPosts: TipoPosts.init(sequelize),
  Posts: Posts.init(sequelize),
  ScreenPosts: ScreenPosts.init(sequelize),
  SeccionPosts: SeccionPosts.init(sequelize),
};

// Configura las asociaciones
Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });
  
  export { models };