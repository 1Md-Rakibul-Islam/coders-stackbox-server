const express = require('express'); 
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express;


app.length('/', async(req, res)=>{
    res.send('CodersStackBox server is running');
})

app.listen(port, ()=> console.log(`CodersStackBox running on ${port}`));