// requiring dependencies
const cors = require('cors');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const config = require('./config.json');

const search = require('./search');
const history = require('./history');

// express function to provide features and functionality for server
const app = express();
const port = 8888;

// apply middleware to application level
app.use(cors());
app.use(express.json());

// add the search routes using the prefix /search
app.use('/search', search);
// add the history routes using the prefix /history
app.use('/history', history);

// using MongoDB url
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.db_name}`;

// create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect((err) => {
    if (err) {
        throw new Error('Failed to connect to MongoDB');
    }

    console.log('Successfully connected to MongoDB');

    app.locals.db = client.db();

    // starting the server
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});