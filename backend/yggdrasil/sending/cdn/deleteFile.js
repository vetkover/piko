const yggFetch = require('../../yggFetch');

const sendObject = {
    path: null,
    method: null,
    body: null
}

function deleteFile(name) {

    sendObject.path = "deletefile"
    sendObject.method = 'POST'
    sendObject.body = {name: name}
    return yggFetch(sendObject)
}



module.exports = deleteFile;

