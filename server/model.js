const mongoose = require("mongoose");

const myURI = 'mongodb+srv://kubric:kubric123@kubricdb.vqagz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(myURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Kubric mongoose connected'))
  .catch((err) => console.log(`new err ${err}`))

const userDB = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true,
},
  password : {
    type: String,
    required: true,
    unique: true,
  }
})

module.exports = mongoose.model('UserDB', userDB);