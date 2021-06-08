const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

//---------- Request logger -------
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

//---------- Morgan --------
morgan.token('body', (req, res) => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  else
    return JSON.stringify()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
      {    
        name: "Arto Hellas",
        number: "01065064",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "059-64-591984",
        id: 2
      },
      {
        name:"Dan Abromod",
        number:"12-43-24352",
        id:3
      },
      {
        name: "Mary Poppendick",
        number: "010-26-19672",
        id: 4
      },
      {
        name: "Jenny Harrison",
        number: "020-63-79298",
        id: 5
      },
      {
        name: "Dan Abromod",
        number: "31-498-64",
        id: 6
      },
      {
        name: "Ali Skd",
        number: "136-43-4634",
        id: 7
      }
]

//----------- Routes --------
// Get all people
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Get people information
app.get('/info', (request, response) => {  
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()}</p>`)
})

// Get a person with id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Delete a person with id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

// Generate unique id from random number
const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  return id
}

// Add a person to the db
app.post('/api/persons/', (request, response) => {
  const body = request.body
  console.log('body', body)

  if (!body.name) {
    return response.status(400).json({ error: 'missing name' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'misisng number' })
  }

  const exist = persons.findIndex(p => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())

  if (exist > -1) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//------- APP ------------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


