
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : String,
    email : String,
    cars : [{
        type: Schema.Types.ObjectId,
        ref: 'car'
    }]
})

const User = mongoose.model('user',userSchema);

module.exports = User;