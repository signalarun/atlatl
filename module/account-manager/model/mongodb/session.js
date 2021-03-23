let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');

let sessionSchema = new mongoose.Schema({
    session : Object,
    expiration : Date
}, { timestamps: true });

sessionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Session', sessionSchema);;