const ctrl = {};
const Publicacion = require('../models/Publicacion');

// Controlador para crear nueva publicación
ctrl.crearPublicacion = async (req, res) => {

    // const { titulo, detalle, url_imagen, fecha } = req.body

    try {
        const publicacion = await Publicacion.create(req.body)
        await publicacion.save()

        return res.json({
            msg: 'Publicación guardada con éxito!',
            publicacion
        })
    } catch (error) {
        //console.log(error.message);
        //console.log(req.body.autor);
        return res.status(500).json({
            msg: "Error al crear nueva Publicación!"
        })
    }

};

// Controlador para obtener todas las publicaciones
ctrl.obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll();
        return res.json(publicaciones)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Error al obtener publicaciones!"
        })
    }
};

// Controlador para obtener una publicación
ctrl.obtenerPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publicacion.findByPk(id);
        return res.json(publicacion)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: "Error al obtener Publicación!"
        })
    }

};

// Controlador para actualizar una publicación
ctrl.actualizarPublicacion = async (req, res) => {
    const { id } = req.params;
    
    try {
        const publicacion = await Publicacion.findByPk(id);
        publicacion.set(req.body)
        await publicacion.save();
        return res.json({
            msg: 'Publicación actualizada con éxito!'
        })  
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: "Error al actualizar Publicación!"
        })
    }
};

// Controlador para eliminar una publicación
ctrl.eliminarPublicacion = async (req, res) => {

    try{
        const { id } = req.params;
        console.log(id)
        //const publicacion = await Publicacion.findByPk(id);
        await Publicacion.destroy({
            where: { id: id }
        });
        return res.json({
            msg: 'Publicación eliminada con éxito!'
        })  
    } catch( error){
        console.log(error);
        return res.status(500).json({
            msg: "Error al eliminar la publicacion"
        })
    }
};


module.exports = ctrl;