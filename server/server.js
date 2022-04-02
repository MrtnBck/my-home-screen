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

app.get('/wallpaper/:query', async (req, res) => {
  //prettier-ignore
  try{
    const {data} = await axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${req.params.query}&orientation=landscape`);

    res.json(data);
  }catch(err){
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`my-home-screen app listening on port ${PORT}!`);
});
