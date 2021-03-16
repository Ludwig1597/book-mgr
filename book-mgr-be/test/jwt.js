var jwt = require('jsonwebtoken');
var token = jwt.sign({
    account: 'a.cc.com',
    _id: '123',
}, 'aaa');

console.log(token); //token令牌

//header
//加密的算法 sha256
//jwt

//payload

//signature

jwt.verify(token, 'aaa', (err, payload) => {
    console.log(err, payload)
})