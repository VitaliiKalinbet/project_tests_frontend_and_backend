const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Module = new Schema(
    {
        modulename: { type: String, required: [ true, 'Укажите название модуля' ]}

    }
);

module.exports = mongoose.model('Module', Module);