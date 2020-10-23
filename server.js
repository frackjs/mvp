const express = require('express')
const productsRoutes = require('./routes/productsRoutes')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('hello world')
})

productsRoutes(app)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
