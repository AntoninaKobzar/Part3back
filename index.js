const express=require('express')
const morgan = require('morgan')
const app=express()


morgan.token('req-body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

app.use(express.json())
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
    response.json(persons)
})



app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).json({ error: 'Person not found' }).end();
    }
});

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

    const person = {
        name: body.name,
        number: body.number,
        id: generatedId(),
    };

    persons.push(person);
    response.json(person);
});


app.delete('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    persons=persons.filter(person=>person.id!==id)

    response.status(204).end()
})

const PORT=3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)