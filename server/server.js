// DEVELOPPEMENT ONLY
require('dotenv').config()

const express = require('express')
var cors = require('cors')

const app = express()

// If PORT env variable is undefined, default is 3000
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * ROUTES
 */

app.use('/products', require('./routes/products'))

app.listen(port, () => console.log(`Server running on :${port}`))