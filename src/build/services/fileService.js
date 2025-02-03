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
exports.getSignedUrl = exports.getFileUrl = exports.getImage = exports.downloadImage = exports.getImages = exports.uploadImage = void 0;
const s3_1 = require("../aws/s3");
const uploadImage = (files, folder, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield (0, s3_1.uploadFile)(files, folder, userId);
        return image;
    }
    catch (err) {
        return err;
    }
});
exports.uploadImage = uploadImage;
const getImages = (folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield (0, s3_1.getFiles)(folder);
        return images;
    }
    catch (error) {
        return error;
    }
});
exports.getImages = getImages;
const getImage = (folder, userId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield (0, s3_1.getFileUser)(folder, userId, fileName);
        return image;
    }
    catch (err) {
        return err;
    }
});
exports.getImage = getImage;
const getFileUrl = (folder, userId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = (0, s3_1.getFileUserKey)(folder, userId, fileName);
        return image;
    }
    catch (err) {
        return err;
    }
});
exports.getFileUrl = getFileUrl;
const getSignedUrl = (file, expires) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield (0, s3_1.urlFile)(file, expires);
        return url;
    }
    catch (err) {
        return err;
    }
});
exports.getSignedUrl = getSignedUrl;
const downloadImage = (folder, userId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield (0, s3_1.downloadFile)(folder, userId, fileName);
        return image;
    }
    catch (err) {
        return err;
    }
});
exports.downloadImage = downloadImage;
