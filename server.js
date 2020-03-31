const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')

const mariaRoutes = require('./routes/index')

app.use(cors())
app.use(mariaRoutes)

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})