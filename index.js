require('dotenv').config()
const express=require('express')
const app=express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const url = process.env.MONGODB_URI
const Person=require('./models/person')

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


mongoose.set('strictQuery',false)
mongoose.connect(url)


app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
const cors = require('cors')
app.use(cors())

morgan.token('req-body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request,response)=>{
    response.send('<h1>Hello World</h1>')
})


app.get('/api/info', (request, response) => {
    const entries = persons.length;
    const responseTime = new Date().toLocaleString();
    const info = `Phonebook has info for ${entries} people.<br/> ${responseTime}`;
    response.send(info);
});

app.get('/api/persons',(request,response)=>{
    Person.find({}).then(persons => {
        response.json(persons)
      })
})


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })


const generatedId=()=>{
    const maxId=persons.length>0
    ?Math.max(...persons.map(person=>person.id))
    :0
    return maxId+1
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const existingPerson = persons.find(person => person.name === body.name);
    if (existingPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generatedId(),
    });

    persons.push(person);
    // response.json(person);

    person.save().then(savedPerson => {
        response.json(savedPerson)
      })
});


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })


  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})