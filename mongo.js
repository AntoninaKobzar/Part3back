require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
const url =process.env.MONGO_DB
  



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
