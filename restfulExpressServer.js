const express = require('express')
const app = express();
const port = 8888
const fs = require('fs');

app.use(express.json())

app.get('/pets', (req, res) => {
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.status(200)
        res.contentType('application/json')
        res.send(data)
    })
})
app.get('/pets/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        if (id >= parseData.length || id < 0) {
            res.status(404)
            res.contentType('text/plain')
            res.send('Not Found')
        } else {
            const stringData = JSON.stringify(parseData[id])
            res.status(200)
            res.contentType('application/json')
            res.send(stringData)
        }
    })
})
app.post("/pets", (req, res) => {
    const addData = req.body
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        parseData.push(addData)
        const stringData = JSON.stringify(parseData)
        fs.writeFile('./pets.json', stringData, (err) => {
            res.status(200)
            res.contentType('application/json')
            res.send(addData)
        })
    })
})

app.patch('/pets/:id', (req, res) => {
    const content = req.body
    const id = req.params.id
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        const objData = parseData[id]
        objData.name = content.name
        const stringData = JSON.stringify(parseData)
        fs.writeFile(`./pets.json`, stringData, (err) => {

            res.status(200)
            res.contentType('application/json')
            res.send(objData)
        })
    })
})




app.delete('/pets/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        console.log(data)
        if (err) {
            res.status(400)
            res.end('An Error has occurred in reading this file...')
        }
        const parseData = JSON.parse(data)
        const removed = parseData.splice(id, 1);
        console.log(parseData)
        const stringData = JSON.stringify(parseData)
        fs.writeFile('./pets.json', stringData, 'utf-8', (err) => {
            if (err) {
                res.status(400)
                res.end('An Error has occurred in reading this file...')
            }
            res.status(200)
            res.contentType('application/json')
            res.send(parseData)
        })
    })
})





app.listen(port, (req, res) => {
    console.log(`listening on ${port}`)

})