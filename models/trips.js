const mongoose = require('mongoose')

const tripSchema = mongoose.Schema({
    city: String,
    destination: String,
    departure: Date,
    agency: String,
    rocket: String, 
    price: Number,
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
})

const tripModel = mongoose.model('trips', tripSchema)

module.exports = tripModel