const mongoose = require('mongoose');
// membuat scemah
const contact = mongoose.model('contact', {
    nama: {
        type: String,
        require: true,
    },
    noHP: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
});

module.exports = contact