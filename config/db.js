const mongoose = require('mongoose');
module.exports.connectToMongoDB = async () => {

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://sousse:g4tXzjquiBeGmzoo@cluster0.8s5fgp6.mongodb.net/").then(()=> {console.log('connected to MongoDB')}).catch((err)=>{console.log('Error connecting to MongoDB:', err)});

}
//g4tXzjquiBeGmzoo
//mongodb+srv://sousse:g4tXzjquiBeGmzoo@cluster0.8s5fgp6.mongodb.net/