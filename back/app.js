
const express = require('express')
const app = express()

const cors = require('cors') 

require('dotenv').config()

const clientsRouter = require('./routes/routes')

app.use(cors()); 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
  
app.use('/api/clients', clientsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})