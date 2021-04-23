/*
guide: https://developer.mongodb.com/how-to/seed-database-with-fake-data/
seedScript.js
*/

// require the necessary libraries
const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

// Connection URI
const YOUR_MONGODB_URI = 'mongodb://localhost:27017';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  // Connection URL
  const uri = YOUR_MONGODB_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('iot').collection('kitty-litter-time-series');

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    await collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];

    for (let i = 0; i < 5000; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      let newDay = {
        timestamp_day: faker.date.past(),
        cat: faker.random.word(),
        owner: {
          email: faker.internet.email(firstName, lastName),
          firstName,
          lastName,
        },
        events: [],
      };

      for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
        let newEvent = {
          timestamp_event: faker.date.past(),
          weight: randomIntFromInterval(14, 16),
        };
        newDay.events.push(newEvent);
      }
      timeSeriesData.push(newDay);
    }
    await collection.insertMany(timeSeriesData);

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
