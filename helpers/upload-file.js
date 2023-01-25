const path = require('path');
const {v4: uuidv4} = require('uuid');

const loadFile = (files, validateExtension = ['png', 'jpg', 'jpeg', 'gif', 'ico'], folder = '') => {

    return new Promise((resolve, reject) => {
        
        const { file } = files;
        const shortName = file.name.split('.');

        const extension = shortName [ shortName.length - 1];

        //validate the extension
        if(!validateExtension.includes(extension)){
            return reject( `The extension ${extension} is not valid, valid extensions are: ${validateExtension}`);
        }
        
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', folder,tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(tempName);
        });

    })




}


module.exports = {
    loadFile
}