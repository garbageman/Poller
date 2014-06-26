// models/user.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new Schema(
  {
    username: String,
    password: String
  }, { collection: 'usercollection' }
);
 
// methods 
userSchema.methods.generateHash = function(password) {
  var user = this;
  bcrypt.hash(password, bcrypt.genSaltSync(8), null, function(err, hash) {
    if (err)
      console.log('Error in bcrypt generateHash.');
    user.password = hash;
  });
};

// checking if password is valid TODO make async?
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

