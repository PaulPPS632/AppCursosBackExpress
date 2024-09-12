import ScreenPosts from "../models/ScreenPosts.js";
import Posts from "../models/Posts.js";
import uploadImage from "./uploadimage.js";
import { where } from "sequelize";
class ScreenScreenPostsController {
    async GetAll(req, res) {
        const Lista = await ScreenPosts.findAll();
        return res.status(200).json(Lista);
      }
      async GetById(req, res) {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "Id no found" });
        const encontrado = await ScreenPosts.findOne({ where: { id } });
        return res.status(200).json(encontrado);
      }
      async create(req, res) {

        const { PostsId, title, description, content } = req.body;

        // Validar la existencia de PostsId
        if (!PostsId) {
            return res.status(400).json({ error: "Se necesita Id de Post" });
        }

        // Buscar el tipo de post
        const tipo = await Posts.findOne({ where: { id: PostsId } });
        if (!tipo) {
            return res.status(400).json({ error: "Tipo no found" });
        }

        // Obtener la fecha actual en formato ISO
        const fechaActual = new Date().toISOString().split("T")[0];


        //-----------------------
        //subir imagen cloudinary

        // Validamos que nos envíen algún archivo
        //if (!req.files || Object.keys(req.files).length === 0) {
        //    return res.status(400).send('No files were uploaded.');
        //}
        //const file = req.file.image;
        //const url_picture = uploadImage(file.tempFilePath);
        let url_picture = '';
        if (req.file) {
            try {
                // Esperar a que se suba la imagen a Cloudinary y obtener la URL
                url_picture = await uploadImage(req.file.path);
                console.log("url_picture:" + url_picture);
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                return res.status(500).json({ error: "Error al subir la imagen" });
            }
        }
        //-----------------------


        try {

            // Usar una transacción para asegurar que todas las operaciones se completen correctamente
            const result = await ScreenPosts.sequelize.transaction(async (t) => {
            // Buscar el ID máximo existente para el PostsId dado
            const maxRecord = await ScreenPosts.findOne({
                attributes: ['id'],
                where: { PostsId },
                order: [['id', 'DESC']],
                transaction: t
            });

            const maxId = maxRecord ? maxRecord.id : 0;

            // Crear un nuevo registro
            const creado = await ScreenPosts.create({
                title,
                description,
                content: JSON.parse(content),
                date: fechaActual,
                url_picture,
                PostsId,
                predecesor: maxId
            }, { transaction: t });

            // Actualizar el registro existente para establecer el campo sucesor
            if (maxId > 0) {
                await ScreenPosts.update({ sucesor: creado.id }, {
                where: { id: maxId },
                transaction: t
                });
            }

            return creado;
            });

            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al procesar la solicitud" });
        }
      }
      async update(req, res) {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "Id no found" });
        const tipo = await TipoScreenPosts.findOne({
          where: { id: req.body.TipoScreenPostsId },
        });
        if (!tipo) return res.status(400).json({ error: "Tipo no found" });
        const { title, description, content, url_picture, TipoScreenPostsId } = req.body;
        const fechaActual = new Date().toISOString().split("T")[0];
        const actualizado = await ScreenPosts.update(
          {
            title,
            description,
            content,
            date: fechaActual,
            url_picture,
            TipoScreenPostsId,
          },
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
        const respuesta = await ScreenPosts.destroy({ where: { id } });
        console.log(respuesta);
        return res.status(200).json(respuesta);
      }
}

export default new ScreenScreenPostsController();
