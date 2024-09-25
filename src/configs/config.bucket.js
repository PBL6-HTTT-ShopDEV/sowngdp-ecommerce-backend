"use strict";

const dev = {
    bucket: {
        name: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
}

const production = {
    bucket: {
        name: process.env.PRO_BUCKET_NAME,
        region: process.env.PRO_BUCKET_REGION,
        accessKeyId: process.env.PRO_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.PRO_BUCKET_SECRET_ACCESS_KEY,
    }
}

const config = { dev, production };

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];


