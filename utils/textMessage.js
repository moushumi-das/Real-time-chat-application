const moment = require('moment')

function textFormat(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = textFormat