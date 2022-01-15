const my = require('./file1');
const add = (a, b) => {
  return a + b;
};

const printMyFaker = () => {
  console.log(my.myFaker);
  return my.myFaker;
}

exports.add = add;
exports.printMyFaker = printMyFaker;