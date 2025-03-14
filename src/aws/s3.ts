import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.BUCKET_REGION || !process.env.PUBLIC_KEY || !process.env.SECRET_KEY || !process.env.BUCKET_NAME) {
    throw new Error('AWS credentials not found');
}

const client = new S3Client({ 
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.PUBLIC_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
})



export const uploadFile = async(file:any, folder: string, userId: number) =>{
    try {
        const fileStream = fs.createReadStream(file.tempFilePath);
        
        const fileName = file.name;
        

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${userId}/${fileName}`,
            Body: fileStream,
            ContentType: file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        const result = await client.send(command);
        

        return result;
    } catch (error) {
        return error;
    }
    
}

export const getFiles = async(folder: string = '') => {
    try {

    const bucket = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix:`${folder}/`,
        MaxKeys: 10
    })

    const result = await client.send(bucket);

    return result;

    } catch (error) {
        return error;
    }
}

export const getFileUserKey = (folder: string, userId: string, fileName: string) => {
    // Genera y devuelve el Key (ruta del archivo en el bucket)
    const key = `${folder}/${userId}/${fileName}`;
    return key;
};

export const getFileUser = async(folder: string, userId: string, fileName: string) => {
    try {
        const object = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${userId}/${fileName}`,
            
        })

        const result = await client.send(object);
        
        return result;
    } catch(error) {

        return error;
    }
}

export const downloadFile = async(folder: string, userId: string, fileName: string) => {
    try {
        const object = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${userId}/${fileName}`
        })
        
        const result = await client.send(object);
        const body = result.Body as Readable;

        if(body) {
            const directory = `./src/images/${userId}`;

            fs.mkdirSync(directory, { recursive: true });
            const filepath = `${directory}/${fileName}`;

            const writeStream = fs.createWriteStream(filepath);
            body.pipe(writeStream);

            return result.$metadata;
        } else { 
            return 'File not found';
        }

    } catch(error) {
        return error;
    }
}

export const urlFile = async (file:string, expires:number) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file,
        });

        // Generar la URL firmada

        const signedUrl = await getSignedUrl(client, command, { expiresIn: expires });
        return signedUrl;
    } catch (error) {
        console.error('URL Signing Error:', error);
        return error;
    }
};