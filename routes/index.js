const app = module.exports = require('express')()

const queries = require('../queries/index')

app.get('/', (req, res) => {
    res.json({ message: "You found me!" })
})

// Get all tests from Database
app.get('/test', async (req, res) => {
    let myResult = await queries.queryMytable()
    res.json(myResult)
})

// Add test to database
app.post('/addtest', async (req, res) => {
    let test = req.body
    console.log(test)

    try {
        let postTest = await queries.addToTable(test.id, test.desc);
        res.json({ message: "Record added succesfully", id: test.id, desc: test.desc})
    } catch (err) {
        res.json({errorMessage: err})
    }
})

// Get one test
app.get('/tests/:id', async (req, res) => {
    try {
        let getOneTest = await queries.getOneTest(req.params.id)
        res.json(getOneTest)
    } catch (err) {
        res.json({errorMessage: err})
    }
})

// Delete one test/record
app.delete('/tests/:id', async (req, res) => {
    try {
        let deleteTest = await queries.deleteTest(req.params.id)
        res.send(deleteTest)
    } catch (err) {
        res.json({errorMessage: err})
    }
})

// Update a test
