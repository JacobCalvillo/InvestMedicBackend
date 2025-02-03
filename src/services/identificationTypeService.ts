import IdentificationType from "../db/models/IdentificationType";

export const getIdentificationTypes = async () => {
    try {
        const identificationTypes = await IdentificationType.findAll();
        return identificationTypes;
    } catch (error) {
        console.error("Error al obtener los tipos de identificación:", error);
        return null;
    }
}

export const createIdentificationType = async (identificationTypeData: any) => {
    try {
        console.log(identificationTypeData);
        const newIdentificationType = await IdentificationType.create(identificationTypeData);
        return newIdentificationType;
    } catch (error) {
        console.error("Error al crear el tipo de identificación:", error);
        return null;
    }
}