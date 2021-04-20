// .replrc.js
const User = require('./model/User');
const user = new User('sloria', 40, 'sloria2@gmail.com');
module.exports = {
  context: [
    'lodash',
    './utils/Common.js',
    { name: 'me', value: user.getByEmail('sloria')}
  ]
};