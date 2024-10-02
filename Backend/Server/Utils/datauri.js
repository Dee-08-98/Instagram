const DataUriParser = require('datauri/parser')
const path = require('path')

const Parser = new DataUriParser()

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toString()
    return Parser.format(extName, file.buffer).content
}

module.exports = getDataUri