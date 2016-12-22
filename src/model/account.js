import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

let Schema = mongoose.Schema

let AccountSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

AccountSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', AccountSchema)
