const path = require('path');

module.exports = {
    DEFAULT_PASSWORD: '123321',
    JWT_SECRET: 'book-mgr',
    UPLOAD_DIR: path.resolve(__dirname, '../upload'),

    SERVER_PORT: 3000,
}