'use strict';

const apiKeyModel = require("../models/apiKey.model");
const crypto = require('crypto');

class ApiKeyService {
    static async findById(key) {
        const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
        return objKey;
    }
    

    static async createApiKey(key, permissions) {
        const apiKey = await apiKeyModel.create({ key, permissions });
        return apiKey;
    }
};

module.exports = ApiKeyService;