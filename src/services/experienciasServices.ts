import { experienciasofDB } from "../modelos/types_d_experiencias";

export const getEntries = {
    getAll: async () => {
        return await experienciasofDB.find();
    },
    findById: async (id: string) => {
        return await experienciasofDB.findById(id);
    },
    // Método para obtener experiencias por propietario (owner)
    findByOwner: async (ownerId: string) => {
        return await experienciasofDB.find({ owner: ownerId }).populate('participants');  // Filtrar por propietario y poblar los participantes
    },
    // Obtener experiencias por participante
    findByParticipant: async (participantId: string) => {
        return await experienciasofDB.find({ participants: participantId }).populate('participants');
    },
    // Agregar un participante a una experiencia
    addParticipant: async (idExp: string, idPart: string) => {
        // Actualizar el documento para agregar el participante al array "participants" y devolver el documento actualizado
        return await experienciasofDB.findByIdAndUpdate(idExp, { $push: { participants: idPart } }, { new: true });
    },
    // Eliminar un participante de una experiencia
    delParticipant: async (idExp: string, idPart: string) => {
        return await experienciasofDB.findByIdAndUpdate(idExp, { $pull: { participants: idPart } }, { new: true });
    },
    create: async (entry: object) => {
        return await experienciasofDB.create(entry);
    },
    update: async (id: string, body: object) => {
        return await experienciasofDB.findByIdAndUpdate(id, body, { new: true });
    },
    delete: async (id: string) => {
        return await experienciasofDB.findByIdAndDelete(id);
    }
};
