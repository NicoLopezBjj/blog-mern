const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const RequestFriendSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    request:{
        type: String,
        required: true
    }
})

const RequestFriend = mongoose.model("RequestFriend",RequestFriendSchema)

module.exports = RequestFriend

