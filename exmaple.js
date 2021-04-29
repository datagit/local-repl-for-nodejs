console.log(Math.round(parseFloat(4.3)));
console.log(Math.round(parseFloat(4.0)));
console.log(Math.round(parseFloat(4.6)));

const _ = require('lodash');
let RankingStatistic = {};
RankingStatistic.starPercentage = {
  1: {
    count: 0,
    key: 'one',
  },
  2: {
    count: 0,
    key: 'two',
  },
  3: {
    count: 1,
    key: 'three',
  },
  4: {
    count: 4,
    key: 'four',
  },
  5: {
    count: 13,
    key: 'five',
  },
};
const countReview = 18;
let starPercentage = {
  one: parseFloat(
    (RankingStatistic.starPercentage[1].count / countReview).toFixed(2)
  ),
  two: parseFloat(
    (RankingStatistic.starPercentage[2].count / countReview).toFixed(2)
  ),
  three: parseFloat(
    (RankingStatistic.starPercentage[3].count / countReview).toFixed(2)
  ),
  four: parseFloat(
    (RankingStatistic.starPercentage[4].count / countReview).toFixed(2)
  ),
  five: parseFloat(
    (RankingStatistic.starPercentage[5].count / countReview).toFixed(2)
  ),
};

// find max
let highestStar = 1;
_.forEach(RankingStatistic.starPercentage, ({ count, key }, star) => {
  if (count > 0) {
    if (RankingStatistic.starPercentage[highestStar].count <= count) {
      highestStar = star;
    }
  }
});

//remove Max
const highestStarKey = RankingStatistic.starPercentage[highestStar].key;
RankingStatistic.starPercentage[highestStar] = {
  key: highestStarKey,
  count: 0,
};

// set value for Max
starPercentage[RankingStatistic.starPercentage[highestStar].key] = 0;
starPercentage[RankingStatistic.starPercentage[highestStar].key] = parseFloat(
  (
    1 -
    starPercentage.one -
    starPercentage.two -
    starPercentage.three -
    starPercentage.four -
    starPercentage.five
  ).toFixed(2)
);

console.log('highestStar', highestStar);
console.log(starPercentage);
