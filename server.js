const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// import routes
const productsRoutes = require('./actionsRoutes/productsRoutes.js')

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

// use routes
productsRoutes(app)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
