const multer = require('multer');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const express = require('express');

app=express();
app.use(express.json());

dotenv.config({path: path.resolve(__dirname,'./.env')});

region='us-west-2';
accessKeyId = process.env.ACCESS_KEY;
secretAccesKey= process.env.SECRET_ACCESS_KEY;

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region:'us-west-2',
});

const s3 = new aws.S3();

const upload = multer({dest:'uploads/'});

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: 'ignitereciepts',
        Body: fileStream,
        Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
}

app.post('/image-upload', upload.single('image'), async (req,res)=> {
    const file = req.file;
    const result = await uploadFile(file);
    console.log(result);
    res.send('sucessful');
});

  app.listen(3000, () =>  { 
    console.log('running server!');
});



