import Service from "../db/models/Service";

export const getServices = async () => {
    try {
        const services = await Service.findAll();
        return services;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getServiceById = async (id: number) => {
    try {
        const service = await Service.findOne({ where: { id: id } });
        return service;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getServiceByName = async (name: string) => {
    try {   
        const service = await Service.findOne({ where: { name: name } });
        return service;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createService = async(data: any) => {
    try {
        const newService = await Service.create({
            data: data
        })
        return newService;
    } catch (error) {
        console.log(error);
        return null;
    }
}