import express from "express";
import { 
        uploadFileController, 
        getFilesController, 
        uploadFilesController, 
        downloadFileController, 
        getFileController, 
        getFileUrlController,
        getSignedUrlController
    } from "../controllers/file.controller";

const router = express.Router();

router.post("/upload/file/:id", uploadFileController);


router.get("/signed/url/:id", getSignedUrlController);


router.get("/files/:id", getFilesController);

router.get('/file/:id', getFileUrlController);


router.get("/file/:id", getFileController);

router.post('/files/:id', uploadFilesController);

router.get('/download/file/:id', downloadFileController);



export { router }