import express from 'express';
import * as userServices from '../services/userServices';

const router = express.Router();

// Ruta para buscar un usuario por nombre (importante que esté antes de /:id)
router.get('/search/:name', async (req, res) => {
    const data = await userServices.getEntries.findByName(req.params.name);
    if (!data) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(data);
});

// Ruta para obtener todos los usuarios
router.get('/', async (_req, res) => {
    const data = await userServices.getEntries.getAll();
    return res.json(data);
});

// Ruta para buscar un usuario por ID
router.get('/:id', async (req, res) => {
    const data = await userServices.getEntries.findById(req.params.id);
    return res.json(data);
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const data = await userServices.getEntries.create(req.body);
    return res.json(data);
});

// Ruta para añadir una experiencia a un usuario
router.post('/addExperiencies/:idUser/:idExp', async (req, res) => {
    const data = await userServices.getEntries.addExperiencies(req.params.idUser, req.params.idExp);
    return res.json(data);
});

// Eliminar una experiencia de un usuario
router.delete('/delExperiencies/:idUser/:idExp', async (req, res) => {
    const data = await userServices.getEntries.delExperiencies(req.params.idUser, req.params.idExp);
    return res.json(data);
});

router.put('/:id', async (req, res) => {
    const data = await userServices.getEntries.update(req.params.id, req.body);
    return res.json(data);
});

router.delete('/:id', async (req, res) => {
    const data = await userServices.getEntries.delete(req.params.id);
    return res.json(data);
});

export default router;
