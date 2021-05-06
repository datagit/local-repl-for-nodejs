/*
guide: https://developer.mongodb.com/how-to/seed-database-with-fake-data/
https://github.com/marak/Faker.js/
https://marak.github.io/faker.js/
seedScript.js
node --trace-warnings  mongodb/seedScript.js
*/

const cryptoUtils = require('parse-server/lib/cryptoUtils');
// require the necessary libraries
const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

// Connection URI
//mongodb://localhost:27017/nailie-dev
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

    const collection = client.db('nailie-dev').collection('Timeline');

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.

    await collection.deleteMany({seedScript: true});

    // make a bunch of time series data
    let requests = [];
    for (let i = 0; i < 4000000; i++) {
      const newRecord = {
        _id: cryptoUtils.newObjectId(),
        _p_user: '_User$J93kqpVSB3',
        _p_booking: 'Booking$oQIPkUqiot',
        _p_content: 'Alert$tB3XrORSs0',
        mentionType: 'BOOKING',
        status: faker.random.arrayElements(['READ', 'UNREAD'], 1).pop(),
        priority: 3,
        isPushed: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        hidden: faker.datatype.boolean(),
        _created_at: faker.date.past(1).toISOString(),
        _updated_at: faker.date.past(1).toISOString(),
        pushTime: faker.date.past(1).toISOString(),
        receiverId: 'cFFzKeBWuj',
        seedScript: true,
      };
      requests.push(newRecord);
      if (requests.length === 1000) {
        await collection.insertMany(requests);
        requests = [];
      }
    }
    if (requests.length > 0) {
      await collection.insertMany(requests);
    }

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();


// Parse run explain
// timelineQuery.explain(true).find()
