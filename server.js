const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const productsRoutes = require('./actionsRoutes/productsRoutes')

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

productsRoutes(app)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
