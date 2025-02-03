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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUrlController = exports.getFileUrlController = exports.getFileController = exports.downloadFileController = exports.uploadFilesController = exports.getFilesController = exports.uploadFileController = void 0;
const fileService_1 = require("../services/fileService");
const path = require('path');
const uploadFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.file;
        const userId = req.params.id;
        const folder = req.query.folder;
        const image = yield (0, fileService_1.uploadImage)(files, folder, Number(userId));
        res.status(200).send({ message: 'File uploaded successfully', image });
    }
    catch (error) {
        res.sendStatus(500).send({ message: 'File not uploaded', error });
    }
});
exports.uploadFileController = uploadFileController;
const uploadFilesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.file;
        const folder = req.query.folder || 'default-folder';
        const userId = req.params.id;
        const object = Array.isArray(files) ? files.map((file) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, fileService_1.uploadImage)(file, folder, Number(userId)); })) : [yield (0, fileService_1.uploadImage)(files, folder, Number(userId))];
        console.log(object);
        res.status(200).send({ message: 'Files uploaded successfully' });
    }
    catch (error) {
        res.sendStatus(500).send({ message: 'Files not uploaded', error });
    }
});
exports.uploadFilesController = uploadFilesController;
const getFilesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folder = req.query.folder || 'default-folder';
        const images = yield (0, fileService_1.getImages)(folder);
        res.status(200).send({ message: 'Files retrieved successfully', images });
    }
    catch (error) {
        res.sendStatus(500).send({ message: 'Files not retrieved', error });
    }
});
exports.getFilesController = getFilesController;
const getSignedUrlController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const folder = req.query.folder;
        const userId = req.params.id;
        const expires = 60;
        const file = `${folder}/${userId}/${name}`;
        const url = yield (0, fileService_1.getSignedUrl)(file, expires);
        res.status(200).send({ url });
    }
    catch (error) {
        res.status(500).send({ message: 'File not retrieved', errorMessage: error });
    }
});
exports.getSignedUrlController = getSignedUrlController;
const getFileUrlController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const folder = (_a = req.query.folder) === null || _a === void 0 ? void 0 : _a.toString();
        let name = (_b = req.query.name) === null || _b === void 0 ? void 0 : _b.toString();
        const userId = req.params.id;
        const image = yield (0, fileService_1.getFileUrl)(folder, userId, name);
        if (!image) {
            res.status(404).send({ message: 'File not found' });
            return;
        }
        res.status(200).send({ image });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'File not retrieved', errorMessage: error });
    }
});
exports.getFileUrlController = getFileUrlController;
const getFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const folder = (_a = req.query.folder) === null || _a === void 0 ? void 0 : _a.toString();
        let name = (_b = req.query.name) === null || _b === void 0 ? void 0 : _b.toString();
        const userId = req.params.id;
        const image = yield (0, fileService_1.getImage)(folder, userId, name);
        if (!image) {
            res.status(404).send({ message: 'File not found' });
            return;
        }
        res.status(200).send({ image });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'File not retrieved', errorMessage: error });
    }
});
exports.getFileController = getFileController;
const downloadFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = req.query.folder;
    let name = req.query.name;
    const userId = req.params.id;
    try {
        name = name + '.jpg';
        yield (0, fileService_1.downloadImage)(folder, userId, name);
        const imagePath = path.join(__dirname, '..', 'images', userId, name);
        console.log(imagePath);
        res.status(200).sendFile(imagePath, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error al descargar el archivo', error: err });
            }
        });
    }
    catch (error) {
        res.sendStatus(500).send({ message: 'File not downloaded', error });
    }
});
exports.downloadFileController = downloadFileController;
