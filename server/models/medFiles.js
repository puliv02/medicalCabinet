const mongoose = require('mongoose');

//This schema represents the folders & files added

const medFilesSchema = new mongoose.Schema({
    addedBy : {
        type : String,
        required : true 
    },
    folderName :{
        type : String
    },
    description : {
        type : String
    },
    addedAt : {
        type : Date,
        default : Date.now()
    },
    files : [
        {
            name :{
                type : String
            },
            fileType : {
                type : String,
                required : true
            },
            file :{
                 data : Buffer,
                 Type : String
            },
            addedAt : {
                type : Date,
                default : Date.now()
            },
        }
    ]


})
module.exports = new mongoose.model('medFiles', medFilesSchema);
