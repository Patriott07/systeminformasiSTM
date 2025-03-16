import { CMS } from '../models/cms.model.js';
import {History} from '../models/history.model.js';
export const getCMS = async (req, res) => {
    try {
        const cms = await CMS.find({});
        if (cms.length > 0) {
            res.json({ cms: cms[0] })
        }
    } catch (error) {
        console.log({ error })
    }
}

export const saveCMS = async (req, res) => {
    try {
        let cms = await CMS.findById(req.body.id);
        if (!cms) {
            res.status(504).json({ message: "Cant find any setting.." })
        }

        cms.name_website = req.body.name_website;
        cms.logo = req.body.logo;
        cms.header_text = req.body.header_text;
        cms.slogan = req.body.slogan;
        cms.cover_background = req.body.cover_background;
        cms.info1 = req.body.info1;
        cms.info2 = req.body.info2;
        cms.info3 = req.body.info3;
        cms.section1_title = req.body.section1_title;
        cms.section1_description = req.body.section1_description;
        cms.section1_image = req.body.section1_image;
        cms.section2_title = req.body.section2_title;
        cms.section2_description = req.body.section2_description;
        cms.section2_image = req.body.section2_image;
        cms.section3_title = req.body.section3_title;
        cms.section3_description = req.body.section3_description;
        cms.section3_image = req.body.section3_image;
        cms.alamat_telp = req.body.alamat_telp;
        cms.email = req.body.email;
        cms.alamat_sekolah = req.body.alamat_sekolah;
        cms.gps_map_link = req.body.gps_map_link;

        await cms.save()

        await History.create({
            created_by: req.user._id.toString(), name: req.user.name,
            aktivitas: `Mengubah Content Website (CMS)`
        });

        res.json({ message: "Berhasil Memanage Content website.." })

    } catch (error) {
        console.log({ error })
    }
}