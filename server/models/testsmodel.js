const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TestSchema = new Schema(
    {
        testname: { type: String, required: [ true, 'Укажите название теста' ]},
        questions: Array,
        moduleId: {type: String, required: [ true, 'Укажите id модуля' ]}
    }
);

let testsModel = mongoose.model('Test', TestSchema);
module.exports = testsModel;