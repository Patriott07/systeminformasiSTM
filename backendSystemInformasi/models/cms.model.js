import mongoose from "mongoose";

const SchemaCMS = mongoose.Schema({
    name_website: String,
    logo: String,
    header_text: String,
    slogan: String,
    cover_background: String,


    info1: String,
    info2: String,
    info3: String,


    section1_title: String,
    section1_description: String,
    section1_image: String,


    section2_title: String,
    section2_description: String,
    section2_image: String,


    section3_title: String,
    section3_description: String,
    section3_image: String,


    alamat_telp: String,
    email: String,
    alamat_sekolah: String,
    gps_map_link: String

    
}, {
    timestamps: true
});

export const CMS = mongoose.model('CMS', SchemaCMS)
