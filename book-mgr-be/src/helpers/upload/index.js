const fs = require('fs');
const { mainModule } = require('process');

const saveFileToDisk = (ctx, filename) => {
    //所有和请求相关的都会放在ctx上下文中
    return new Promise((resolve, reject) => {
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const writeStream = fs.createWriteStream(filename);

        reader.pipe(writeStream);

        reader.on('end', () => {
            resolve(filename);
        });

        reader.on('error', (err) => {
            reject(err);
        });

    });
};

const getUploadFileExt = (ctx) => {
    const { name = '' } = ctx.request.files.file;
    return name.split('.').pop();
}
module.exports = {
        saveFileToDisk,
        getUploadFileExt
    } //然后去routers/upload下写接口