const moment = require('moment');

const startDays = moment().subtract({day: 1}).utc().startOf('day');
const endDays = start30Days.clone().subtract({days: 5});