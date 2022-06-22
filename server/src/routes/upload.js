// const express = require('express');
// const router = express.Router();
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'public/images');
//     },
//     filename: (req, file, callback) => {
//         callback(null, req.body.name);
//     }
// });

// const upload = multer({storage: storage});

// router.post('/', upload.single('file'), (req, res) => {
//     res.json('File has uploaded');
// });

// module.exports = router;