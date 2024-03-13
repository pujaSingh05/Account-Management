const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userid: {
        type: String,
        required:  true,
    },
    name: {
        type: String,
        required: [true,'Account name is required'],
        unique: true
    },
    industry: {
        type: String,
        required: [true,'Industry  is required'],
    },
    website: {
        type: String,
        required: [true,'website ame is required'],
    },
    address: {
        type: String,
        required: [true,'address is is required'],
    },
    notes: {
        type: String
    },
},
{ timestamps: true });

const accountModel = mongoose.model('Account', accountSchema);

module.exports = accountModel;
