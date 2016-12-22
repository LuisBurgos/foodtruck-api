import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

let Schema = mongoose.Schema

let AccountSchema = new Schema({
  email: String,
  password: String
})

AccountSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', AccountSchema)
