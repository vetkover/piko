const yggFetch = require('../../yggFetch');

const sendObject = {
    path: null,
    method: null,
    body: null
}

function moveTempFile(dataObject) {

    sendObject.path = "movetempfile"
    sendObject.method = 'POST'
    sendObject.body = dataObject
    return yggFetch(sendObject)
}

module.exports = moveTempFile;

