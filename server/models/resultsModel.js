const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResultSchema = new Schema(
    {
        testid: { type: String, required: [ true] },
        correct: { type: Number, required: [ true] },
        percentage: { type: Number, required: [ true] }
    }
);

let resultsModel = mongoose.model('Result', ResultSchema);
module.exports = resultsModel;