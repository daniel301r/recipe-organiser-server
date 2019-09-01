const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    joined: Date,
    recipes: [{
        id: mongoose.Schema.Types.ObjectId,
        name: {type: String},
        description: {type: String},
        tags: [String],
        comments: [String],
        ingredients: [{
            id: mongoose.Schema.Types.ObjectId,
            amount: {type: String},
            unit: {type: String},
            name: {type: String},
            preparation: {type: String}
        }],
        instructions: [String]

    }]
})

// the second argument is the name of the collection you want to create with this
const User = mongoose.model('Users', userSchema)

module.exports = User;


