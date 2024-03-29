
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://antoninakobzar:${password}@cluster1.wqrslo1.mongodb.net/persons
  .persons?retryWrites=true&w=majority`



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

// person.find({}).then(result => {
//   result.forEach(person => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })
// node mongo.js QaR6mnOaC3p3rNzo Anna 040-1234556
//node mongo.js QaR6mnOaC3p3rNzo Osa 050-1334559