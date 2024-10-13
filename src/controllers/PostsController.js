import Posts from "../models/Posts.js";
import ScreenPosts from "../models/ScreenPosts.js";
import TipoPosts from "../models/TipoPosts.js";
import uploadImage from "./uploadimage.js";
import { paginate } from "./paginate.js";

class PostsController {
  async GetAll(req, res) {
    const Lista = await Posts.findAll();
    return res.status(200).json(Lista);
  }
  async GetById(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Id no found" });
    const encontrado = await Posts.findOne({ where: { id } });
    return res.status(200).json(encontrado);
  }
  async create(req, res) {
    const Tipoid = req.body.TipoPostsId;

    const tipo = await TipoPosts.findOne({ where: { id: Tipoid } });
    if (!tipo) return res.status(400).json({ error: "Tipo no found" });
    const { title, description, content,TipoPostsId } = req.body;
    const fechaActual = new Date().toISOString().split("T")[0];

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
    const creado = await Posts.create({
      title,
      description,
      content,
      date: fechaActual,
      url_picture,
      TipoPostsId,
    });
    return res.status(200).json(creado);
  }
  async update(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Id no found" });
    const tipo = await TipoPosts.findOne({
      where: { id: req.body.TipoPostsId },
    });
    if (!tipo) return res.status(400).json({ error: "Tipo no found" });
    const { title, description, content, TipoPostsId } = req.body;
    const fechaActual = new Date().toISOString().split("T")[0];
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
    const actualizado = await Posts.update(
      {
        title,
        description,
        content,
        date: fechaActual,
        url_picture,
        TipoPostsId,
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
    const respuesta = await Posts.destroy({ where: { id } });
    console.log(respuesta);
    return res.status(200).json(respuesta);
  }
  async GetScreens(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Se necesita ID de Post" });
    const screens = await Posts.findAll({include:ScreenPosts, where:{id}});
    return res.status(200).json(screens);
  }
  async GetFirstScreen(req, res){
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Se necesita ID de Post" });
    const screen = await ScreenPosts.findAll({where:{PostsId:id, predecesor: 0 }});
    return res.status(200).json(screen);
  }
  async GetScreensPaged(req,res){
    const {id,page, order_by, order_direction,limit} = req.query;
    if (!id) return res.status(400).json({ error: "Se necesita ID de Post" });
    //const screens = await Posts.findAll({include:ScreenPosts, where:{id}});
    try {
      let search ={};
      let order=[];
      if(order_by && order_direction){
        order.push([order_by,order_direction]);
      }
      const transform = (records) =>{
        return records.map(record =>{
          return {
            
          }
        })
      }

    } catch (error) {
      
    }
    
    
    
    return res.status(200).json(screens);
  }
}

export default new PostsController();
