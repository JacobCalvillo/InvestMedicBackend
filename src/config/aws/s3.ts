import {
    S3Client,
    PutObjectCommand,
    ListObjectsCommand,
    GetObjectCommand,
    S3ServiceException
} from '@aws-sdk/client-s3';
import fs from 'fs';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import path from 'path';

// Response type definitions for consistent return formats
interface S3Response<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code?: string;
        details?: any;
    };
}

// File upload request type
interface FileUploadRequest {
    tempFilePath: string;
    name: string;
    mimetype: string;
}

dotenv.config();

// Environment variable validation with more detailed error messages
const requiredEnvVars = {
    BUCKET_REGION: process.env.BUCKET_REGION,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME
};

const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

if (missingVars.length > 0) {
    throw new Error(`Missing required AWS environment variables: ${missingVars.join(', ')}`);
}

// Initialize S3 client only once
const s3Client = new S3Client({
    region: process.env.BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.PUBLIC_KEY!,
        secretAccessKey: process.env.SECRET_KEY!
    },
    // Adding retries for better resilience
    maxAttempts: 3
});

// Helper function to format errors consistently
const formatError = (error: any): S3Response<any>['error'] => {
    if (error instanceof S3ServiceException) {
        return {
            message: error.message,
            code: error.$metadata?.httpStatusCode?.toString() || error.name,
            details: error
        };
    }

    return {
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error
    };
};

/**
 * Uploads a file to the S3 bucket
 * @param file The file to upload
 * @param folder The folder path within the bucket
 * @param userId The user ID for the file path
 * @returns A response object with success status and data or error
 */
export const uploadFile = async(
    file: FileUploadRequest,
    folder: string,
    userId: number
): Promise<S3Response<any>> => {
    try {
        if (!file || !file.tempFilePath || !file.name) {
            return {
                success: false,
                error: {
                    message: 'Invalid file provided',
                    code: 'INVALID_PARAMS'
                }
            };
        }

        const fileStream = fs.createReadStream(file.tempFilePath);
        const key = `${folder}/${userId}/${file.name}`;

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: fileStream,
            ContentType: file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);
        const result = await s3Client.send(command);

        // Return a standardized response with the file path for easy reference
        return {
            success: true,
            data: {
                ...result,
                filePath: key,
                fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`
            }
        };
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        return {
            success: false,
            error: formatError(error)
        };
    }
};

/**
 * Lists files in a specific folder in the S3 bucket
 * @param folder The folder path to list files from
 * @param maxKeys Maximum number of objects to return (default: 100)
 * @returns A response object with the list of files or error
 */
export const getFiles = async(
    folder: string = '',
    maxKeys: number = 100
): Promise<S3Response<any>> => {
    try {
        const command = new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Prefix: folder ? `${folder}/` : '',
            MaxKeys: maxKeys
        });

        const result = await s3Client.send(command);

        // Transform the result to a more user-friendly format
        const files = result.Contents?.map(item => ({
            key: item.Key,
            size: item.Size,
            lastModified: item.LastModified,
            eTag: item.ETag
        })) || [];

        return {
            success: true,
            data: {
                files,
                count: files.length,
                isTruncated: result.IsTruncated
            }
        };
    } catch (error) {
        console.error('Error listing files from S3:', error);
        return {
            success: false,
            error: formatError(error)
        };
    }
};

/**
 * Generates a file key (path) for a specific user's file
 * @param folder The folder path
 * @param userId The user ID
 * @param fileName The file name
 * @returns The complete file key in the S3 bucket
 */
export const getFileUserKey = (
    folder: string,
    userId: string,
    fileName: string
): string => {
    return `${folder}/${userId}/${fileName}`;
};

/**
 * Gets a file from the S3 bucket
 * @param folder The folder path
 * @param userId The user ID
 * @param fileName The file name
 * @returns A response object with the file data or error
 */
export const getFileUser = async(
    folder: string,
    userId: string,
    fileName: string
): Promise<S3Response<any>> => {
    try {
        const key = getFileUserKey(folder, userId, fileName);

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key
        });

        const result = await s3Client.send(command);

        // Add content type information for easier handling
        return {
            success: true,
            data: {
                ...result,
                contentType: result.ContentType,
                contentLength: result.ContentLength,
                key: key
            }
        };
    } catch (error) {
        console.error('Error getting file from S3:', error);
        return {
            success: false,
            error: formatError(error)
        };
    }
};

/**
 * Downloads a file from S3 and saves it to the local filesystem
 * @param folder The folder path
 * @param userId The user ID
 * @param fileName The file name
 * @param destinationDir Optional custom destination directory
 * @returns A response object with the download result or error
 */
export const downloadFile = async(
    folder: string,
    userId: string,
    fileName: string,
    destinationDir?: string
): Promise<S3Response<any>> => {
    try {
        const key = getFileUserKey(folder, userId, fileName);

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key
        });

        const result = await s3Client.send(command);
        const body = result.Body as Readable;

        if (!body) {
            return {
                success: false,
                error: {
                    message: 'File not found or empty',
                    code: 'FILE_NOT_FOUND'
                }
            };
        }

        // Define the directory where the file will be saved
        const directory = destinationDir || path.join('./src/images', userId);

        // Ensure the directory exists
        fs.mkdirSync(directory, { recursive: true });
        const filepath = path.join(directory, fileName);

        // Create write stream and handle errors properly
        return new Promise((resolve) => {
            const writeStream = fs.createWriteStream(filepath);

            writeStream.on('error', (err) => {
                resolve({
                    success: false,
                    error: {
                        message: `Failed to write file: ${err.message}`,
                        details: err
                    }
                });
            });

            writeStream.on('finish', () => {
                resolve({
                    success: true,
                    data: {
                        filePath: filepath,
                        contentType: result.ContentType,
                        metadata: result.$metadata
                    }
                });
            });

            body.pipe(writeStream);
        });
    } catch (error) {
        console.error('Error downloading file from S3:', error);
        return {
            success: false,
            error: formatError(error)
        };
    }
};

// /**
//  * Generates a signed URL for temporary access to a file
//  * @param expires Expiration time in seconds
//  * @returns A response object with the signed URL or error
//  */
// export const getSignedUrl = async (
//     s3Client: S3Client, command: GetObjectCommand, p0: {
//         expiresIn: number
//     }, expires: number = 3600): Promise<S3Response<string>> => {
//     try {
//         if (!file) {
//             return {
//                 success: false,
//                 error: {
//                     message: 'File key is required',
//                     code: 'INVALID_PARAMS'
//                 }
//             };
//         }
//
//         let file;
//         const command = new GetObjectCommand({
//             Bucket: process.env.AWS_BUCKET_NAME!,
//             Key: file,
//         });
//
//         const signedUrl = await getSignedUrl(s3Client, command, {
//             expiresIn: expires
//         });
//
//         return {
//             success: true,
//             data: signedUrl
//         };
//     } catch (error) {
//         console.error('Error generating signed URL:', error);
//         return {
//             success: false,
//             error: formatError(error)
//         };
//     }
// };

/**
 * Checks if a file exists in the S3 bucket
 * @param key The complete file key in the S3 bucket
 * @returns A response object with the existence status or error
 */
export const fileExists = async(key: string): Promise<S3Response<boolean>> => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key
        });

        await s3Client.send(command);
        return {
            success: true,
            data: true
        };
    } catch (error: any) {
        // If the error code is 404, the file doesn't exist (not an error for this function)
        if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
            return {
                success: true,
                data: false
            };
        }

        // Other errors are actual errors
        console.error('Error checking if file exists:', error);
        return {
            success: false,
            error: formatError(error)
        };
    }
};