const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// const multer = require('multer');
const formidable = require('express-formidable');
const userRoutes = require('./routes/userRoutes')
const fileRoutes = require('./routes/fileRoutes')
require("dotenv").config();

//set up express

const app = express();
const PORT = process.env.PORT || 5000;
console.log("starting server");
app.listen(PORT, () => { console.log(`server started on port : ${PORT}`) });

app.use(cors());

// for parsing application/json
app.use(express.json());

// //for parsing multipart/form-data
// const upload = multer();
// app.use(upload.array()); 
// app.use(express.static('public'));
// app.use(formidable());


// set up mangoose

console.log("connecting to MongoDB");
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true },
    (err) => {
        if (err)
            return console.error(err);
        console.log("mongoDB connection established")
    });


// set up routes
app.use('/api/auth',userRoutes)
app.use('/api/files', fileRoutes)
