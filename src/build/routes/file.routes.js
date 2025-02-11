"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const fileController_1 = require("../controllers/fileController");
const router = express_1.default.Router();
exports.router = router;
router.post("/upload/file/:id", fileController_1.uploadFileController);
router.get("/signed/url/:id", fileController_1.getSignedUrlController);
router.get("/files/:id", fileController_1.getFilesController);
router.get('/file/:id', fileController_1.getFileUrlController);
router.get("/file/:id", fileController_1.getFileController);
router.post('/files/:id', fileController_1.uploadFilesController);
router.get('/download/file/:id', fileController_1.downloadFileController);
