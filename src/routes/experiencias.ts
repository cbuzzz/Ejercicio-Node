import express from 'express';
import * as experienciasServices from '../services/experienciasServices';

const router = express.Router();

// Ruta para obtener todas las experiencias o filtrar por propietario (owner) o por participante (participant)
router.get('/', async (req, res) => {
    const { owner, participant } = req.query;

    try {
        let experiencias = [];

        if (typeof owner === 'string') {
            experiencias = await experienciasServices.getEntries.findByOwner(owner);
        } else if (typeof participant === 'string') {
            experiencias = await experienciasServices.getEntries.findByParticipant(participant);
        } else {
            experiencias = await experienciasServices.getEntries.getAll();
        }

        return res.json(experiencias);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las experiencias' });
    }
});


// Ruta para obtener una experiencia por ID
router.get('/:id', async (req, res) => {
    try {
        // Buscar una experiencia por ID usando findById
        const data = await experienciasServices.getEntries.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Experiencia no encontrada' });
        }
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la experiencia por ID' });
    }
});

// Ruta para crear una nueva experiencia
router.post('/', async (req, res) => {
    try {
        const data = await experienciasServices.getEntries.create(req.body);
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la experiencia' });
    }
});

// Ruta para agregar un participante a una experiencia
router.post('/addParticipant/:idExp/:idPart', async (req, res) => {
    try {
        const data = await experienciasServices.getEntries.addParticipant(req.params.idExp, req.params.idPart);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error al añadir el participante' });
    }
});

// Ruta para actualizar una experiencia
router.put('/:id', async (req, res) => {
    try {
        const data = await experienciasServices.getEntries.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Experiencia no encontrada' });
        }
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la experiencia' });
    }
});

// Ruta para eliminar una experiencia
router.delete('/:id', async (req, res) => {
    try {
        const data = await experienciasServices.getEntries.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Experiencia no encontrada' });
        }
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la experiencia' });
    }
});

export default router;
