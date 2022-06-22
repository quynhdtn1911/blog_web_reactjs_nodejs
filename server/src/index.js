const express = require('express');
const initRouter = require('./routes/index.js');
const {connectToDB} = require('./config/db');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/images');
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name);
    }
});

const upload = multer({storage: storage});

// initRouter
initRouter(app);

app.post('/upload', upload.single('file'), (req, res) => {
    res.json('File has uploaded');
});

//connect to mongodb
connectToDB();

// listen port
const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT);
})