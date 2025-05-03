import { Request, Response } from "express";
import { uploadImage, getImages, downloadImage, getImage} from "../../core/services/file.service";
import path from 'path';

const   uploadFileController = async (req: Request, res: Response) => {
    try {
        const files = req.file;
        const userId = req.params.id;
        const folder = req.query.folder as string;

        const image = await uploadImage(files, folder, Number(userId));

        res.status(200).send({message: 'File uploaded successfully', image});

    } catch (error) {
        res.sendStatus(500).send({message: 'File not uploaded', error});
    }
}

const uploadFilesController = async(req: Request, res: Response) => {
    try {
        const files = req.file;
        const folder = req.query.folder as string || 'default-folder';
        const userId = req.params.id;

        const object = Array.isArray(files) ? files.map(async file => 
            await uploadImage(file, folder, Number(userId))) : [await uploadImage(files, folder, Number(userId))];
        
        console.log(object)

        res.status(200).send({message: 'Files uploaded successfully'});
    } catch (error) {
        res.sendStatus(500).send({message: 'Files not uploaded', error});
    }
}


const getFilesController = async (req: Request, res: Response) => {
    try {
        const folder = req.query.folder as string || 'default-folder';

        const images = await getImages(folder);
        
        res.status(200).send({message: 'Files retrieved successfully', images});
    } catch (error) {
        res.sendStatus(500).send({message: 'Files not retrieved', error});
    }
}

const getFileController = async (req: Request, res: Response) => {
    try {
        const folder = req.query.folder?.toString() as string;
        let name = req.query.name?.toString() as string;
        const userId = req.params.id as string;


        const image =  await getImage(folder,userId, name);

        if(!image) {
            res.status(404).send({message: 'File not found'});
            return;
        }
        res.status(200).send({image});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'File not retrieved', errorMessage: error });
    }
}

const downloadFileController = async (req: Request, res: Response) => {
    const folder = req.query.folder as string;
    let name = req.query.name as string;
    const userId = req.params.id;

     try {
        name = name + '.jpg';
        
        await downloadImage(folder, userId, name);

        const imagePath = path.join(__dirname, '..', 'images', userId, name);
        console.log(imagePath)

        res.status(200).sendFile(imagePath, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error al descargar el archivo', error: err });
            }
        });

     } catch (error) {
        res.sendStatus(500).send({message: 'File not downloaded', error});
     }
    
}

export { 
        uploadFileController, 
        getFilesController, 
        uploadFilesController, 
        downloadFileController, 
        getFileController,
    };