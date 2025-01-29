import Identification from "../db/models/Identification";

export const createIdentification = async (identificationData: Identification) => {
    try {
        const newIdentification = await Identification.create({
            data: identificationData
        })
        return newIdentification;
    } catch (error) {
        console.error("Error al crear la identificación:", error);
        return null;
    }
}

export const getIdentifications = async () => {
    try {
        const identifications = await Identification.findAll();
        return identifications;
    } catch (error) {
        console.error("Error al obtener la identificación:", error);
        return null;
    }
}

export const getIdentificationById = async (id: number) => {
    try {
        const identification = await Identification.findOne({ where: { id: id } });
        return identification;
    } catch (error) {
        console.error("Error al obtener la identificación:", error);
        return null;
    }
}

export const updateIdentification = async (id: number, identificationData: any) => {
    try {
        const updatedIdentification = await Identification.update(identificationData, { where: { id: id } });
        return updatedIdentification;
    } catch (error) {
        console.error("Error al actualizar la identificación:", error);
        return null;
    }
}

export const deleteIdentification = async (id: number) => {
    try {
        const deletedIdentification = await Identification.destroy({ where: { id: id } });
        return deletedIdentification;
    } catch (error) {
        console.error("Error al eliminar la identificación:", error);
        return null;
    }
}