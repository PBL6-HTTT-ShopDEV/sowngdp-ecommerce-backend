'use strict';

const AWS = require('aws-sdk');
const config = require('../configs/config.bucket');
const s3 = require('../dbs/init.s3');


class ImageService {
    static async uploadImages(files) {
        const uploadPromises = files.map((file) => {
            const params = {
                Bucket: config.bucket.name,
                Key: `images/${Date.now()}_${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            };

            return s3.upload(params).promise();
        });

        const uploadResults = await Promise.all(uploadPromises);

        const imageUrls = uploadResults.map((result) => result.Location);

        return imageUrls;
    }

    static async uploadImage(file) {
        const params = {
            Bucket: config.bucket.name,
            Key: `images/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        const result = await s3.upload(params).promise();

        return result.Location;
    }
}

module.exports = ImageService;