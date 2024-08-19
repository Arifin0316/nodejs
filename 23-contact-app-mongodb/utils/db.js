const strict = require('assert/strict');
const mongoose = require('mongoose');
const { type } = require('os');
mongoose.connect('mongodb://127.0.0.1:27017/arifin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



// menambah 1 data
// const contact1 = new contact({
//     nama: 'arifin',
//     noHP: '08237482022',
//     email: 'arifin@gmail.com',
// });

// sipan ke colection
// contact1.save().then((contact) => console.log(contact));