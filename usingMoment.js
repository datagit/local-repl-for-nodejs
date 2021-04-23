const moment = require('moment');

// console.log(moment().endOf('day').utc());
// console.log(moment().utcOffset('+0900').endOf('day').utc());
const nailistId = 'x';
const userViewNailistPage = undefined;
if (userViewNailistPage && userViewNailistPage != nailistId) {
  console.log('T');
} else {
  console.log('F');
}