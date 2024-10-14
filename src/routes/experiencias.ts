import express from 'express';
import * as experienciasServices from '../services/experienciasServices';
import * as userService from '../services/userServices';  // Importar el servicio de usuarios para actualizar el array de experiencias

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
        // Crear la nueva experiencia
        const newExperience = await experienciasServices.getEntries.create(req.body);

        // Extraer los participantes de la experiencia recién creada
        const participants = req.body.participants;

        // Actualizar el array experiencies[] de cada usuario participante
        for (const participantId of participants) {
            // Convertir el ObjectId a string antes de pasarlo a la función
            await userService.getEntries.addExperiencies(participantId, newExperience._id.toString());
        }

        return res.status(201).json(newExperience);
    } catch (error) {
        console.error('Error al crear la experiencia o actualizar los usuarios:', error);
        return res.status(500).json({ message: 'Error al crear la experiencia' });
    }
});



// Ruta para agregar un participante a una experiencia
router.post('/addParticipant/:idExp/:idPart', async (req, res) => {
    try {
        console.log('Añadiendo participante a la experiencia', req.params.idExp, 'Usuario:', req.params.idPart);

        // Añadir el participante a la experiencia
        const data = await experienciasServices.getEntries.addParticipant(req.params.idExp, req.params.idPart);

        // Actualizar el array experiences[] del usuario con la nueva experiencia
        const updateUser = await userService.getEntries.addExperiencies(req.params.idPart, req.params.idExp);

        if (!updateUser) {
            return res.status(400).json({ message: 'Error al actualizar las experiencias del usuario' });
        }

        return res.json(data);
    } catch (error) {
        console.error('Error al añadir el participante o actualizar el usuario:', error);
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
