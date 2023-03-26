const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const axios = require('axios')

app.use(cors())

app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => [
  res.send(posts)
])

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id, title
  }

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  }).catch(err => console.log(err))

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('Received event', req.body.type)

  res.send({})
})

app.listen(4000, () => {
  console.log("V25")
  console.log("you are listening to the port 4000")
})
