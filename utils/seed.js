const connection = require('../config/connection');
const { User, Thought } = require('../modals');
const userData = require('./userData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    // await Thought.deleteMany({});
    await User.collection.insertMany(userData);
    
    console.table(userData);
    console.info('Seeding complete!');
})


