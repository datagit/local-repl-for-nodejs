const user = require('./user');
const getName1 = () => {
  return `User1 ${user.getName()}`;
};

exports.getName1 = getName1;