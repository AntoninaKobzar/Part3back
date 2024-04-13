require('dotenv').config()
const mongoose = require('mongoose')

  



mongoose.set('strictQuery',false)

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name:'',
  number:'',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
