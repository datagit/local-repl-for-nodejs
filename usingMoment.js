const moment = require('moment');

// console.log(moment().endOf('day').utc());
// console.log(moment().utcOffset('+0900').endOf('day').utc());
const x = { z: new Date() };
console.log(!!x.z);
const obj = { z: 'q' };
console.log(!!obj.z);

const currentTime = moment().utc();
const conditionDeleteMany = {
  fromBeforeMonth: {
    _created_at: { $lt: currentTime.clone().startOf('month').toDate() },
  },
  from2MonthAgo: {
    _created_at: {
      $lt: currentTime
        .clone()
        .startOf('month')
        .subtract({ months: 2 })
        .toDate(),
    },
  },
};
console.log(currentTime);
console.log(currentTime.clone().startOf('month').toDate());
console.log(
  currentTime.clone().startOf('month').subtract({ months: 2 }).toDate()
);
