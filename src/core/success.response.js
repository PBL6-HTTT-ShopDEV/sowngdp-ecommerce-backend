// 'use strict';



const {
    StatusCodes,
    ReasonPhrases
} = require('../utils/httpStatusCode');





class SuccessResponse {
    constructor({
        message,
        status = StatusCodes.OK,
        reason = ReasonPhrases.OK,
        metadata = {}
    }) {
        this.message = !message? ReasonPhrases : message
        this.status = reason
        this.code = status
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.code).json(this)
    }
}
class Success extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}

class Created extends SuccessResponse {
    constructor({
        message,
        status = StatusCodes.CREATED,
        reason = ReasonPhrases.CREATED,
        metadata = {}
    }) {
        super({ message, status, reason, metadata })
    }
}

module.exports = {
    Success,
    Created
};