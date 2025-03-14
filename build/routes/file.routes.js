"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("../controllers/file.controller");
const router = express_1.default.Router();
exports.router = router;
router.post("/upload/file/:id", file_controller_1.uploadFileController);
router.get("/signed/url/:id", file_controller_1.getSignedUrlController);
router.get("/files/:id", file_controller_1.getFilesController);
router.get('/file/:id', file_controller_1.getFileUrlController);
router.get("/file/:id", file_controller_1.getFileController);
router.post('/files/:id', file_controller_1.uploadFilesController);
router.get('/download/file/:id', file_controller_1.downloadFileController);
