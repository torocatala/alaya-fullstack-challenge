const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    fullName: { type: 'String', required: true },
    username: { type: 'String', required: true, unique: true },
    email: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true},
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

// Hashes the password when a new user is created
userSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);

    next();

});


module.exports = mongoose.model('User', userSchema);
