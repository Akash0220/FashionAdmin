const mongoose = require('mongoose');
const DB = `mongodb+srv://bluestar:bluestar123@cluster0.uucjt.mongodb.net/bluestar?retryWrites=true&w=majority`;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`Database connnected successfully`)
}).catch(()=>{
    console.log(`Database is not connected`)
})

mongoose.Promise =Promise;
mongoose.set('debug',true);

module.exports.Products = require('./product');
module.exports.Users = require('./user');
