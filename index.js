require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')

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
morgan.token('body', (request) => {
  if (request.method === 'POST')
    return JSON.stringify(request.body)
  else
    return JSON.stringify()
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//       {
//         name: "Arto Hellas",
//         number: "01065064",
//         id: 1
//       },
//       {
//         name: "Ada Lovelace",
//         number: "059-64-591984",
//         id: 2
//       },
//       {
//         name:"Dan Abromod",
//         number:"12-43-24352",
//         id:3
//       },
//       {
//         name: "Mary Poppendick",
//         number: "010-26-19672",
//         id: 4
//       },
//       {
//         name: "Jenny Harrison",
//         number: "020-63-79298",
//         id: 5
//       },
//       {
//         name: "Dan Abromod",
//         number: "31-498-64",
//         id: 6
//       },
//       {
//         name: "Ali Skd",
//         number: "136-43-4634",
//         id: 7
//       }
// ]

//----------- Routes --------
// Get all people
app.get('/api/persons', (request, response) => {
  // console.log(password)
  Person.find({}).then(persons => {
    // persons.forEach(person => {
    //   console.log(`${person.name} ${person.number}`)
    // })
    response.json(persons)
  })
})

// Get people information
app.get('/info', (request, response) => {
  Person.countDocuments().then(result => {
    response.send(`<p>Phonebook has info for ${result} people</p>
        <p>${Date()}</p>`)
  })

})

// Get a person with id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

// Delete a person with id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
  // persons = persons.filter(p => p.id !== id)
  // response.status(204).end()
})

// Generate unique id from random number
const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  return id
}

// Add a person to the db
app.post('/api/persons/', (request, response, next) => {
  const body = request.body
  console.log('body', body)

  if (!body.name) {
    return response.status(400).json({ error: 'missing name' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'misisng number' })
  }

  // const exist = persons.findIndex(p => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())

  // if (exist > -1) {
  //   return response.status(400).json({ error: 'name must be unique' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId()
  })

  person.save().then(addedPerson => {
    response.json(addedPerson)
  })
    .catch(error => next(error))

})

//------- PUT -----------
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//------- Unknown endpoint --------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


//------- Error handler --------
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next (error)
}

app.use(errorHandler)

//------- APP ------------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


