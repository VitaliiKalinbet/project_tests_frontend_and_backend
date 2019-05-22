const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcryptjs');

let User = new Schema(
    {
        email: { type: String, required: [ true, 'Укажите email' ]},
        results:
            [{
                testid: String,
                title: String,
                totalQuest: Number,
                corAnswers: Number,
                success: String,
        }],
        hash: { type: String, required: true }
    },{ timestamps: { createdAt: 'created_at' }}
    );

User.methods.setPassword = function(password) {
    this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

User.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.hash);
};

let user = mongoose.model('User', User);
module.exports = user;