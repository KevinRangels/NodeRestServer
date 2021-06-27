const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (files, extensionValid = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
    
        const nameCut = file.name.split('.')
    
        const extension = nameCut[nameCut.length - 1]
    
        if (!extensionValid.includes(extension)) {
            return reject(
                `The extension ${extension} not valid - ${extensionValid}`
            )
        }
    
        const nameTemporal = uuidv4() + '.' + extension
    
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemporal);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(nameTemporal)
        });

    })


}

module.exports = {
    uploadFiles
}