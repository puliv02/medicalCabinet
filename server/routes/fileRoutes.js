// const multer = require('multer');
const express = require('express');
const {auth} = require('../middleware/auth');
const formidable = require('express-formidable');
const router = express.Router();
// const upload = multer({dest : 'files/'});
const {addFile, getFiles, addFolder, addFileToFolder, deleteFile, deleteFolder, getFilesFromFolderId} = require('../controller/fileController');
router.post('/newFile', auth, formidable(), addFile);
router.post('/addFile/:id', auth, formidable(), addFileToFolder);
router.get('/getallfiles/:addedby', auth, getFiles);
// router.post('/newFolder', auth, upload.single('test'), addFolder);
router.post('/newFolder', auth, addFolder);
router.patch('/deletefile/:id1/:id2', deleteFile);
router.delete('/deletefolder/:id', deleteFolder)
router.get('/fetchfiles/:id', getFilesFromFolderId);
module.exports = router;