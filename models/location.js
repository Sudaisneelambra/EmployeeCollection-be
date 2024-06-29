const mongoose = require('mongoose')
const locationSchema = mongoose.Schema({
    locationName:{
        type:String,
        required:true
    }
})

const locationModel = mongoose.model('location',locationSchema)

module.exports = locationModel