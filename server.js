const express =  require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Place = require('./models/place');


const uri = "mongodb://admin:admin@cluster0-shard-00-00-srpxy.gcp.mongodb.net:27017,cluster0-shard-00-01-srpxy.gcp.mongodb.net:27017,cluster0-shard-00-02-srpxy.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).
    then(() => console.log('Connected')).
    catch(err => console.log('Caught', err.stack));

app.use(express.json());
app.get('/', (req, res) => res.send("Hello World"));


app.get('/api/airbnb/listings', async (req, res) => {

    //Get data from MongoDB
    const query = {};
    const Places = await Place.find(query);
    console.log(Places);
    res.json(Places);
})

app.get('/api/airbnb/listings/:id', async (req, res) => {

    // Get data from MongoDB
    console.log(req.params.id);
    const query = {_id: req.params.id};
    const Places = await Place.find(query);
    console.log(Places);
    res.json(Places);

})


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))