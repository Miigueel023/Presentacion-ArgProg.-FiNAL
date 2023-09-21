const router = require('express').Router();
const {
    actualizarPublicacion,
    crearPublicacion,
    eliminarPublicacion,
    obtenerPublicacion,
    obtenerPublicaciones,
} = require('../controllers/blog.controllers');
const Publicacion = require('../models/Publicacion');
// ====================================================
//          Rutas para manejar Vistas (views)
// ====================================================
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/admin', (req, res) => {
    res.render('admin')
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.get('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await Publicacion.findByPk(id);
        
        return res.render('editar', {
            publicacion: publicacion
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            msg: "Error al obtener Publicación!"
        })
    }
})

// ====================================================
//              Rutas para manejar Datos
// ====================================================
// Ruta para obtener todas las publicaciones
router.get('/publicaciones/', obtenerPublicaciones);

// Ruta para obtener una publicación
router.get('/publicacion/:id', obtenerPublicacion);

// Ruta para crear nueva publicación
router.post('/publicacion/', crearPublicacion);

// Ruta para actualizar publicación
router.put('/publicacion/:id', actualizarPublicacion);

// Ruta para eliminar publicación
router.delete('/publicacion/:id', eliminarPublicacion);



module.exports = router;