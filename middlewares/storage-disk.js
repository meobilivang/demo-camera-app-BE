const multer = require('multer');
var path = require('path');
const fs = require('fs');
// var ShortUniqueId = require('short-unique-id');
const { default: ShortUniqueId } = require('short-unique-id');

var upload = multer({
    storage: new multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        // filename: function (req, file, cb) {
        //     cb(null, file.fieldname + '-' + Date.now())
        // }
        filename: function (req, file, cb) {
            var temp_code = new ShortUniqueId().randomUUID(13).toUpperCase();
            var temp_ext = path.extname(file.originalname);
            var temp_file = temp_code + temp_ext;
            cb(null, temp_file);
        }
    })
})

var getFileInStorage = (filename) => {
    if (!upload)
        upload = Multer({
            storage: new Multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'uploads/')
                },
                // filename: function (req, file, cb) {
                //     cb(null, file.fieldname + '-' + Date.now())
                // }
                filename: function (req, file, cb) {
                    var temp_code = new ShortUniqueId().randomUUID(13).toUpperCase();
                    var temp_ext = path.extname(file.originalname);
                    var temp_file = temp_code + temp_ext;
                    cb(null, temp_file);
                }
            }),
            // limits: {
            //     fileSize: config.Storage_LimitSize * 1024 * 1024
            // }
        });

    return upload.single(filename);
};

module.exports = {
    upload,
    getFileInStorage
}