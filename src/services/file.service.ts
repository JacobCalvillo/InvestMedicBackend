import { uploadFile, getFiles, downloadFile, getFileUser, getFileUserKey, urlFile } from '../aws/s3';

const uploadImage = async (files: any, folder: string, userId: number) => {
    try {
        const image =  await uploadFile(files, folder, userId);

        return image;
    } catch(err) {
        return err;
    }
}

const getImages = async(folder: string) => {
    try { 
        const images = await getFiles(folder);
        
        return images;
    } catch (error) {
        return error;
    }
}

const getImage = async(folder: string, userId: string, fileName: string) => {
    try {
        const image =  await getFileUser(folder, userId, fileName);
        return image;
    } catch(err) {
        return err;
    }
}

const getFileUrl = async(folder: string, userId: string, fileName: string) => {
    try {
        const image =  getFileUserKey(folder, userId, fileName);
        return image;
    } catch(err) {
        return err;
    }
}

const getSignedUrl = async(file: string, expires: number) => {
    try {
        
        const url = await urlFile(file, expires);

        return url;
    } catch(err) {
        return err;
    }
}


const downloadImage = async(folder: string, userId: string, fileName: string) => {
    try {
        const image =  await downloadFile(folder, userId, fileName);

        return image;
    } catch(err) {
        return err;
    }
}

export { uploadImage, getImages, downloadImage, getImage, getFileUrl, getSignedUrl }