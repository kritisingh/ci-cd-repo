/**
 * Module dependencies.
 */
var mongoose    = require('mongoose');
var validate    = require('mongoose-validator').validate;
var bcrypt      = require('bcrypt');
var Schema      = mongoose.Schema;
var ObjectId    = Schema.ObjectId;
/**
 * User Schema
 */
var UserSchema = new Schema({
    id:                 ObjectId,
    username:           { type: String, trim: true, required: true, lowercase: true },
    hashed_password:    { type: String, trim: true },
    isOTP:		{type:Boolean},
    pass:		{type:String},
    status:             String, // REQUESTED APPROVED
    sellerId:		{ type: ObjectId, ref: 'Sellers'},
    email:		String,
    party:              { type: ObjectId, ref: 'Parties'},
    pageType:           String
});

/**
 * Validations
 */
var validatePresenceOf = function (value) {
    return value && value.length;
}

/*
 * Virtuals
 
UserSchema
    .virtual('password')
    .set(function(password) {
      this._password = password
      this.hashed_password = this.encryptPassword(password)
    })
    .get(function() { return this._password });
/**
 * Methods
 
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
  
 authenticate: function(plainText) {
      return bcrypt.compareSync(plainText, this.hashed_password)
   },
   encryptPassword: function(password) {
      if (!password) { return '' }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      return hash;
   }
}
*/
module.exports = mongoose.model('User', UserSchema);

