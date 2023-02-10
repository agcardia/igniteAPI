const multer = require('multer');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();

dotenv.config({path: path.resolve(__dirname,'./.env')});

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region:process.env.REGION,
});

const s3 = new aws.S3();
const upload = multer({dest:'uploads/'});

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Body: fileStream,
        Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
}

router.post('/', upload.single('image'), async (req,res)=> {
    const file = req.file;
    const result = await uploadFile(file);
    console.log(result);
    res.send('sucessful');
});

module.exports = router;




