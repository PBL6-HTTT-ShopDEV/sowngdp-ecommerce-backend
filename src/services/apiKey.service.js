'use strict'
const apiKeyModel = require('../models/apiKey.model')

const findByID = async (id) => {
    const apiKey = await apiKeyModel.findOne({ _id: id, status: true }).lean()
    return apiKey
}

module.exports = {
    findByID,
}