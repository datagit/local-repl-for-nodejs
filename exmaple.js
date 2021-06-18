const _ = require('lodash');
const faker = require('faker');

const a = faker.random.arrayElements([1, 2, 3, 4, 5], 1).pop();
const b = faker.random.arrayElements([1, 2, 3, 4, 5], 1).pop();

console.log(a, b);
