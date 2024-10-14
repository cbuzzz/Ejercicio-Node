import { usersofDB } from '../modelos/types_d_users';

export const getEntries = {
    getAll: async () => {
        return await usersofDB.find();
    },
    findById: async (id: string) => {
        return await usersofDB.findById(id);
    },
    // Buscar usuario por nombre
    findByName: async (name: string) => {
        return await usersofDB.findOne({ name });
    },
    // Agregar una experiencia al array del usuario sin duplicados
    addExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $addToSet: { experiencies: idExp } }, { new: true });
    },
    // Eliminar una experiencia del array del usuario
    delExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $pull: { experiencies: idExp } }, { new: true });
    },
    create: async (entry: object) => {
        return await usersofDB.create(entry);
    },
    update: async (id: string, body: object) => {
        return await usersofDB.findByIdAndUpdate(id, body, { new: true });
    },
    delete: async (id: string) => {
        return await usersofDB.findByIdAndDelete(id);
    }
};
