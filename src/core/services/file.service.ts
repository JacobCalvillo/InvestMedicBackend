import {
    uploadFile,
    getFiles,
    downloadFile,
    getFileUser,
    getFileUserKey,
    fileExists
} from '../../config/aws/s3';

/**
 * Response type definition for consistent file service responses
 */
export interface FileServiceResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code?: string;
        details?: any;
    };
}

/**
 * File service class for handling file operations
 * Provides a cleaner API over the S3 utilities
 */
export class FileService {
    /**
     * Uploads an image to the storage service
     * @param file The file to upload
     * @param folder The folder path in storage
     * @param userId The user ID for file organization
     * @returns A response with upload status and details
     */
    static async uploadImage(file: any, folder: string, userId: number): Promise<FileServiceResponse> {
        try {
            if (!file) {
                return {
                    success: false,
                    error: {
                        message: 'No file provided',
                        code: 'MISSING_FILE'
                    }
                };
            }

            const result = await uploadFile(file, folder, userId);

            return result;
        } catch (error) {
            console.error('Error in FileService.uploadImage:', error);
            return {
                success: false,
                error: {
                    message: error instanceof Error ? error.message : 'Unknown error uploading image',
                    details: error
                }
            };
        }
    }

    /**
     * Retrieves images from a specific folder
     * @param folder The folder to get images from
     * @param maxResults Optional limit on number of results
     * @returns A response with the list of images
     */
    static async getImages(folder: string, maxResults?: number): Promise<FileServiceResponse> {
        try {
            const result = await getFiles(folder, maxResults);
            return result;
        } catch (error) {
            console.error('Error in FileService.getImages:', error);
            return {
                success: false,
                error: {
                    message: error instanceof Error ? error.message : 'Unknown error getting images',
                    details: error
                }
            };
        }
    }

    /**
     * Retrieves a specific image by folder, user ID, and filename
     * @param folder The folder containing the image
     * @param userId The user ID associated with the image
     * @param fileName The name of the image file
     * @returns A response with the image data
     */
    static async getImage(folder: string, userId: string, fileName: string): Promise<FileServiceResponse> {
        try {
            const result = await getFileUser(folder, userId, fileName);
            return result;
        } catch (error) {
            console.error('Error in FileService.getImage:', error);
            return {
                success: false,
                error: {
                    message: error instanceof Error ? error.message : 'Unknown error getting image',
                    details: error
                }
            };
        }
    }

    /**
     * Downloads an image from storage to the local filesystem
     * @param folder The folder path
     * @param userId The user ID
     * @param fileName The file name
     * @param destinationPath Optional custom destination path
     * @returns A response with download status and file details
     */
    static async downloadImage(
        folder: string,
        userId: string,
        fileName: string,
        destinationPath?: string
    ): Promise<FileServiceResponse> {
        try {
            const result = await downloadFile(folder, userId, fileName, destinationPath);
            return result;
        } catch (error) {
            console.error('Error in FileService.downloadImage:', error);
            return {
                success: false,
                error: {
                    message: error instanceof Error ? error.message : 'Unknown error downloading image',
                    details: error
                }
            };
        }
    }

    /**
     * Checks if a file exists for a specific user
     * @param folder The folder path
     * @param userId The user ID
     * @param fileName The file name
     * @returns A response indicating if the file exists
     */
    static async fileExists(folder: string, userId: string, fileName: string): Promise<FileServiceResponse<boolean>> {
        try {
            const key = getFileUserKey(folder, userId, fileName);
            return await fileExists(key);
        } catch (error) {
            console.error('Error in FileService.fileExists:', error);
            return {
                success: false,
                error: {
                    message: error instanceof Error ? error.message : 'Unknown error checking file existence',
                    details: error
                }
            };
        }
    }
}

// For backward compatibility, also export individual functions
// These simply delegate to the class methods
export const uploadImage = FileService.uploadImage;
export const getImages = FileService.getImages;
export const getImage = FileService.getImage;
export const downloadImage = FileService.downloadImage;