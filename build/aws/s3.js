"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFile = exports.downloadFile = exports.getFileUser = exports.getFileUserKey = exports.getFiles = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.AWS_BUCKET_REGION || !process.env.AWS_PUBLIC_KEY || !process.env.AWS_SECRET_KEY || !process.env.AWS_BUCKET_NAME) {
    throw new Error('AWS credentials not found');
}
const client = new client_s3_1.S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
const uploadFile = (file, folder, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileStream = fs_1.default.createReadStream(file.tempFilePath);
        const fileName = file.name;
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${userId}/${fileName}`,
            Body: fileStream,
            ContentType: file.mimetype
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        const result = yield client.send(command);
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.uploadFile = uploadFile;
const getFiles = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (folder = '') {
    try {
        const bucket = new client_s3_1.ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `${folder}/`,
            MaxKeys: 10
        });
        const result = yield client.send(bucket);
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.getFiles = getFiles;
const getFileUserKey = (folder, userId, fileName) => {
    // Genera y devuelve el Key (ruta del archivo en el bucket)
    const key = `${folder}/${userId}/${fileName}`;
    return key;
};
exports.getFileUserKey = getFileUserKey;
const getFileUser = (folder, userId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const object = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${userId}/${fileName}`,
        });
        const result = yield client.send(object);
        return result;
    }
    catch (error) {
        return error;
    }
});
exports.getFileUser = getFileUser;
const downloadFile = (folder, userId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const object = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${userId}/${fileName}`
        });
        const result = yield client.send(object);
        const body = result.Body;
        if (body) {
            const directory = `./src/images/${userId}`;
            fs_1.default.mkdirSync(directory, { recursive: true });
            const filepath = `${directory}/${fileName}`;
            const writeStream = fs_1.default.createWriteStream(filepath);
            body.pipe(writeStream);
            return result.$metadata;
        }
        else {
            return 'File not found';
        }
    }
    catch (error) {
        return error;
    }
});
exports.downloadFile = downloadFile;
const urlFile = (file, expires) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file,
        });
        // Generar la URL firmada
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: expires });
        return signedUrl;
    }
    catch (error) {
        console.error('URL Signing Error:', error);
        return error;
    }
});
exports.urlFile = urlFile;
