const mongoose = require('mongoose');

mongoose
    .connect('mongodb://admin:secret@mongo:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 1000 })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;
