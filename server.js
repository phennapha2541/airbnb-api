const express = require('express');
const app = express();
// set server port
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Place = require('./models/place');
const cors = require('cors');
app.use(cors());


const uri = "mongodb://admin:admin@cluster0-shard-00-00-srpxy.gcp.mongodb.net:27017,cluster0-shard-00-01-srpxy.gcp.mongodb.net:27017,cluster0-shard-00-02-srpxy.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).
    then(() => console.log('Connected')).
    catch(err => console.log('Caught', err.stack));

app.use(express.json());
app.get('/', (req, res) => res.send("Hello, World"));

// Get all listing
app.get('/api/airbnb/listings', async (req, res) => {

    // Get data from MongoDB
    const query = {};
    const places = await Place.find(query).limit(20);
    console.log(places);
    res.json(places);

})

// Get listing by ID
app.get('/api/airbnb/listings/:id', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.id);
    const query = {_id: req.params.id};
    const places = await Place.find(query).limit(20);
    console.log(places);
    res.json(places);

})

// Get listing by city name
app.get('/api/airbnb/listings/city/:cityname', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.cityname);
    const query = {"address.market": req.params.cityname};
    const places = await Place.find(query).limit(20);
    console.log(places);
    res.json(places);

})

app.get('/api/airbnb/listings/rating/:min', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.min);
    const query = {"review_scores.review_scores_rating": {$gt : parseInt(req.params.min)}};
    const places = await Place.find(query).select({ "reviews": 0, "host":0}).limit(20);
    console.log(places);
    res.json(places);

})


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))
