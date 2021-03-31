const xlsx = require('node-xlsx');

const workSheet = xlsx.parse(`${__dirname}/123.xlsx`);
console.log(workSheet[0].data);