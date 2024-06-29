const mongoose = require('mongoose')
const designationSchema = mongoose.Schema({
    designationName:{
        type:String,
        required:true
    }
})

const designationModel = mongoose.model('designations',designationSchema)

module.exports = designationModel