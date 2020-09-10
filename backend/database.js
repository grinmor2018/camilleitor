const mongoose = require('mongoose');

const URI = 'mongodb://localhost/camillatormeandb';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err  => console.error(err));

module.exports = mongoose;