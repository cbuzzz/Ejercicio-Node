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
    addExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $push: { experiencies: idExp } });
    },
    delExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $pull: { experiencies: idExp } });
    },
    create: async (entry: object) => {
        return await usersofDB.create(entry);
    },
    update: async (id: string, body: object) => {
        console.log(body);
        return await usersofDB.findByIdAndUpdate(id, body, { $new: true });
    },
    delete: async (id: string) => {
        return await usersofDB.findByIdAndDelete(id);
    }
};
