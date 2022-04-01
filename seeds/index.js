const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6239f7a8a78d95e58838e071',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { type: 'Point', coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
            ] },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/shabreeshnair/image/upload/v1648138318/YelpCamp/d3nda7c97x1rogmrmapc.jpg',
                    filename: 'YelpCamp/d3nda7c97x1rogmrmapc'
                },
                {
                    url: 'https://res.cloudinary.com/shabreeshnair/image/upload/v1648138317/YelpCamp/lp3lly50kmwl6dx05tgq.jpg',
                    filename: 'YelpCamp/lp3lly50kmwl6dx05tgq'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam perspiciatis odit quis nihil ipsam tempora adipisci sint assumenda beatae in minima, nam, voluptatem debitis, inventore ducimus vitae eligendi exercitationem vel.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});