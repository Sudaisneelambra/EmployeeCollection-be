// requiring dependencies,laibraries
require('dotenv').config()
const experss = require('express')


// requiring from .env
const PORT = process.env.PORT

const app = experss()


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})