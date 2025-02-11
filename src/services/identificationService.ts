import IIdentification from "../utils/interfaces/Iidentification";
import  IdentificationUser from "../db/models/IdentificationUser";

export const createIdentification = async (identificationData: IIdentification) => {
    try {
        console.log(identificationData);
        const { identificationTypeId } = identificationData;
        
        const newIdentification = await IdentificationUser.create({
            ...identificationData,
            identificationTypeId: Number(identificationTypeId)
        });
         
        return newIdentification;
    } catch (error) {
        console.error("Error al crear la identificación:", error);
        return null;
    }
}

export const getIdentifications = async () => {
    try {
        const identifications = await IdentificationUser.findAll();
        return identifications;
    } catch (error) {
        console.error("Error al obtener la identificación:", error);
        return null;
    }
}

export const getIdentificationById = async (id: number) => {
    try {
        const identification = await IdentificationUser.findOne({ where: { id: id } });
        return identification;
    } catch (error) {
        console.error("Error al obtener la identificación:", error);
        return null;
    }
}

export const updateIdentification = async (id: number, identificationData: IIdentification) => {
    try {
        const updatedIdentification = await IdentificationUser.update(identificationData, { where: { id: id } });
        return updatedIdentification;
    } catch (error) {
        console.error("Error al actualizar la identificación:", error);
        return null;
    }
}

export const deleteIdentification = async (id: number) => {
    try {
        const deletedIdentification = await IdentificationUser.destroy({ where: { id: id } });
        return deletedIdentification;
    } catch (error) {
        console.error("Error al eliminar la identificación:", error);
        return null;
    }
}