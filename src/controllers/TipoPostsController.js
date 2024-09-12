import { where } from "sequelize";
import TipoPosts from "../models/TipoPosts.js";

class TipoPostsController {
  async GetAll(req, res) {
    const Lista = await TipoPosts.findAll();
    return res.status(200).json(Lista);
  }
  async GetById(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Id no found" });
    const encontrado = await TipoPosts.findOne({ where: { id } });
    return res.status(200).json(encontrado);
  }
  async create(req, res) {
    const { name, descripcion } = req.body;
    const creado = await TipoPosts.create({ name, descripcion });
    return res.status(200).json(creado);
  }
  async update(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Id no found" });
    const { name, descripcion } = req.body;
    const actualizado = await TipoPosts.update(
      { name, descripcion },
      {
        where: {
          id,
        },
      }
    );
    console.log(actualizado);
    return res.status(200).json(actualizado);
  }
  async delete(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Id no found" });
    const respuesta = await TipoPosts.destroy({where:{id}});
    console.log(respuesta);
    return res.status(200).json(respuesta);
  }
}

export default new TipoPostsController();
