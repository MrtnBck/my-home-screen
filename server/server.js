const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cors = require('cors');

/* app.use('/static', express.static(path.join(__dirname, 'public'))); */
app.use(express.static('../client/public'));
app.use(cors());

const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'weather.html'));
  //res.sendFile('weather.html');
});

//API
//ACCUWEATHER API

//get location key
app.get('/weather/location/:country/:city', async (req, res) => {
  try {
    //prettier-ignore
    const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/${req.params.country}/search?apikey=${process.env.ACCUWEATHER_ACCESS_KEY}&q=${req.params.city}`)
    const locationKey = data[0].Key;
    //console.log(locationKey);
    res.json(locationKey);
  } catch (err) {
    console.log(err);
  }
});
//get current weather condition
app.get('/weather/current/:locationKey', async (req, res) => {
  try {
    //prettier-ignore
    const {data} = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${req.params.locationKey}?apikey=${process.env.ACCUWEATHER_ACCESS_KEY}`)
    //console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
//ACCUWEATHER API END

//UNSPLASH API
app.get('/wallpaper/:query', async (req, res) => {
  //prettier-ignore
  try{
    const {data} = await axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${req.params.query}&orientation=landscape`);
    res.json(data);
  }catch(err){
    console.log(err);
  }
});
//UNSPLASH API END

//START THE SERVER
app.listen(PORT, () => {
  console.log(`my-home-screen app listening on port ${PORT}!`);
});
