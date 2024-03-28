
const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

const url ="mongodb+srv://antoninakobzar:QaR6mnOaC3p3rNzo@cluster1.wqrslo1.mongodb.net/"


mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Adam Dull',
  number: '1231212',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})