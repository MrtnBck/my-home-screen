const express = require('express');
const app = express();
const port = 8000;

/* const PORT = process.env.PORT || 8000; */
/* if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`my-home-screen app listening on port ${port}!`);
});
