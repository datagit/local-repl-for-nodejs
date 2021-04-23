const moment = require('moment');

// console.log(moment().endOf('day').utc());
// console.log(moment().utcOffset('+0900').endOf('day').utc());
const x = {z: new Date()};
console.log(!!x.z);
const obj = {z:'q'};
console.log(!!obj.z);