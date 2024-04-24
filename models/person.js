const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
  const phoneNumberValidator = {
    validator: function(value) {
      
      const phoneNumberRegex = /^(\d{2,3})-(\d+)$/;
      return phoneNumberRegex.test(value);
    },
    message: props => `${props.value} is not a valid phone number. Please provide a phone number in the format XX-XXXXXXX or XXX-XXXXXXX.`,
  };
  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    number: {
      type: String,
      required: true,
      validate: phoneNumberValidator
    },
  })
  

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Person', personSchema)