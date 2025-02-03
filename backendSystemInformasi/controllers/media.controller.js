import path from 'path';
import fs from 'fs';
import { Medias } from '../models/media.model.js';

export const SaveFileImage = async (req, res) => {
    // console.log(req.files, req.file);

    const { type } = req.body; // (string)image, video
    const file = req.files.file; // file
    let now = new Date().getTime();

    let extname = path.extname(file.name);
    const namefile = `${file.md5}-${now}${extname}`;

    const dirPath = type == "image" ?
        `./public/images/${namefile}`: 
        `./public/videos/${namefile}`;

    let url;
    if (type == "image"){
        url = `${req.protocol}://${req.get('host')}/images/${namefile}`; // folder simpan foto
        
    }else{
        url = `${req.protocol}://${req.get('host')}/videos/${namefile}`; // folder simpan foto
    }

    file.mv(dirPath, async (err) => {
        if (err) return res.status(502).json({ message: `Something trouble while move images`, dirPath, error: err });
        try {

            Medias.create({ path: dirPath, url: url, type })

            res.status(200).json({ message: `${type} posted success!`, namefile, url, path: dirPath })
        } catch (error) {
            res.status(503).json({ message: "Something wrong while uploading file", error })
            console.log(error)
        }
    })

}


export const DeleteFileImage = async (req, res) => {
    try {
        const { path } = req.body;
        fs.unlinkSync(path);

        res.json({ message: "Succesfully delete file" })
    } catch (error) {
        console.log({ message: "Something error while deleting", error })
        res.status(503).json({ message: "Something wrong while deleting file", error })
    }
}
