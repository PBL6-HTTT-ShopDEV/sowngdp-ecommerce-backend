'use strict';
const accountModel = require('../models/account.model');

class AccountService {
    static findByEmail = async ({ email, select = {
        email: 1, password: 2, name: 1, status: 1, roles: 1
    } }) => {
        return await accountModel.findOne({ email }).select(select).lean();
    }

    
}

const findByEmail = async ({ email, select = {
    email: 1, password: 2, name: 1, status: 1, roles: 1
} }) => {
    return await accountModel.findOne({ email }).select(select).lean();
}

module.exports = AccountService;
module.exports = { findByEmail };