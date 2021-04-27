const fs = require('fs');
const medFiles = require('../models/medFiles')
const addFolder = async (req, res) => {
    try {
        console.log(req.body);
        const { addedBy, folderName, description } = req.body;
        const folder = new medFiles({
            addedBy,
            folderName,
            description,
        });
        console.log(folder);
        const savedFile = await folder.save();
        console.log(savedFile);
        res.json(savedFile._id);
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

// used to get all the folders/files for a specific user
const getFiles = async (req, res) => {
    try {
        const folders = await medFiles.find({ addedBy: req.params.addedby });
        console.log(folders);
        res.json(folders);
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

const addFileToFolder = async (req, res) => {
    try {
        console.log(req.fields);
        console.log(req.files);
        console.log(req.params.id);
        if (req.files) {
            const fullType = req.files.content.type;
            const Type = fullType.split('/')[1];
            if (Type == 'jpg' || Type == 'jpeg' || Type == 'png' || Type == 'pdf' || Type == 'doc') {
                const filePath = req.files.content.path;
                const { fileName, fileType } = req.fields;
                const updateData = {
                    name: fileName,
                    fileType,
                    file: {
                        data: fs.readFileSync(filePath),
                        Type
                    }
                }
                console.log(updateData);
                const file = await medFiles.findOneAndUpdate({ _id: req.params.id },
                    { $push: { files: updateData } });
                console.log(file);
                res.status(201).json({ message: "File added successfully" });
            }
            else {
                return res.status(400).json({ message: `Files of ${Type} are not supported.` })
            }
        }
        else {
            return res.status(400).json({ message: " Please add your file !" })
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}


const addFile = async (req, res) => {
    try {
        if (req.files) {
            const fullType = req.files.content.type;
            const Type = fullType.split('/')[1];

            if (Type == 'jpg' || Type == 'jpeg' || Type == 'png' || Type == 'pdf' || Type == 'doc') {
                console.log(req.files);
                console.log(req.fields);
                const filePath = req.files.content.path;
                const { addedBy, fileName, fileType } = req.fields;
                const addedFile = new medFiles({
                    addedBy,
                    files: [{
                        name: fileName,
                        fileType,
                        file: {
                            data: fs.readFileSync(filePath),
                            Type
                        }
                    }]
                });
                console.log(addedFile);
                const savedFile = await addedFile.save();
                console.log(savedFile);
                res.status(201).json({ message: "new file added" });
            }
            else {
                return res.status(400).json({ message: `Files of ${Type} are not supported.` })
            }
        }
        else {
    return res.status(400).json({ message: " Please add your file !" })
}
    }
    catch (err) {
    console.log(err);
    res.status(500).send();
}
}

const deleteFile = async (req, res) => {
    try {
        const file = await medFiles.findOneAndUpdate(
            { _id: req.params.id1 },
            { $pull: { files : { _id: req.params.id2} } },
            { new: true },
            function(err) {
                if (err) { console.log(err) }
            })
            console.log(file)
            res.status(200).json({ message: "File deleted successfully" });
    }
    catch(err) {
        console.log(err);
        res.status(500).send();
    }
}

const deleteFolder = async (req, res) => {
    try {
        await medFiles.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: "Folder deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

module.exports = { addFile, addFileToFolder, getFiles, addFolder, deleteFile, deleteFolder };