import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Entidad from "../../models/users/Entidad.js";
import Posts from "../../models/Posts.js";

class EntidadController {

    async getAll(req, res) {
        try {
        const entidades = await Entidad.findAll({
            include: { model: Posts, attributes: ["id", "title", "description"] },
        });
        const resp = entidades.map((entidad) => ({
            id: entidad.id,
            nombre: entidad.nombre,
            apellido: entidad.apellido,
            email: entidad.email,
            posts: entidad.posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            })),
        }));
        return res.status(200).json(resp);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID no proporcionado" });

        const entidad = await Entidad.findOne({
            where: { localId: id },
            //include: { model: Posts, attributes: ["id", "title", "description"] },
        });

        if (entidad) {
            return res.status(200).json(entidad);
        }
        return res.status(404).json({ message: "Entidad no encontrada" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
          const { nombre, apellido, direccion, telefono, email, localId } = req.body;
    
          // Validación de entrada
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Formato de email inválido" });
          }
          if (!nombre) {
            return res.status(400).json({ message: "Se requiere un nombre" });
          }
          if (!apellido) {
            return res.status(400).json({ message: "Se requiere un apellido" });
          }
    
          // Verificar si la entidad ya existe
        //   const entidadExiste = await Entidad.findOne({ where: { documento } });
        //   if (entidadExiste) {
        //     return res.status(400).json({ message: "Entidad ya existe" });
        //   }
    
          // Crear nueva entidad
          const entidad = await Entidad.create({
            nombre,
            apellido,
            direccion,
            telefono,
            email,
            localId,
          });
          return res.status(201).json({
            message: "Entidad creada exitosamente",
            entidad,
          });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, apellido, direccion, telefono, email, password } = req.body;
    
            const entidad = await Entidad.findByPk(id);
            if (!entidad) {
                return res.status(404).json({ message: "Entidad no encontrada" });
            }
    
            // Verificar si el email ya está en uso por otra entidad
            if (email) {
                const existingEntidad = await Entidad.findOne({ where: { email } });
                if (existingEntidad && existingEntidad.id !== id) {
                    return res.status(400).json({ message: "El email ya está en uso" });
                }
            }
    
            entidad.nombre = nombre || entidad.nombre;
            entidad.apellido = apellido || entidad.apellido;
            // entidad.documento = documento || entidad.documento;
            entidad.direccion = direccion || entidad.direccion;
            entidad.telefono = telefono || entidad.telefono;
            entidad.email = email || entidad.email;
            entidad.password = password || entidad.password;
    
            await entidad.save();
    
            return res.status(200).json({ message: "Entidad actualizada exitosamente", entidad });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    

    async login(req, res) {
        const { email, password } = req.body;
        try {
        const entidadEncontrada = await Entidad.findOne({
            where: { email },
            //include: { model: Posts, attributes: ["id", "title", "description"] },
        });

        if (!entidadEncontrada) {
            return res.status(404).json({ message: "Entidad no encontrada" });
        }

        const resultado = await Entidad.comparePassword(password, entidadEncontrada.password);
        if (resultado) {
            const token = jwt.sign(
            { id: entidadEncontrada.id },
            process.env.SECRET_KEY,
            {
                expiresIn: 86400,
            }
            );
            return res.status(200).json({
            token: token,
            usuario: entidadEncontrada,
            });
        } else {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        } catch (error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }

}

export default new EntidadController();
