const express = require('express')
const app = express()
const port = 7777
const fs = require('fs')

app.get('/pets', (req, res) => {
    fs.readFile('pets.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(400)
            res.end('An Error has occurred in reading this file...')
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(data)
    })
})

app.get('/pets/:id', (req, res) => {
    fs.readFile('pets.json', 'utf-8', function (err, data) {
        if (err) {
            res.status(400)
            res.end('An Error has occurred in reading this file...')
        }
        const petData = JSON.parse(data)
        const index = req.params.id
        console.log(index)
        if (index < 0 || index >= petData.length) {
            res.status(404)
            res.setHeader('Content-Type', 'text/plain')
            res.send('404 Not Found')
        } else {
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            const elem = petData[Number(index)]
            res.send(JSON.stringify(elem))
        }
    })
})

app.post('/pets', (req, res) => {

    fs.readFile('pets.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(400)
            res.end('An Error has occurred in reading this file...')
        }
        const age = req.query.age
        const kind = req.query.kind
        const name = req.query.name
        const pet = { age, kind, name }
        const parsedData = JSON.parse(data)
        parsedData.push(pet)

        const petJSON = JSON.stringify(parsedData)
        res.send(petJSON)
        if (!age || !kind || !name) {
            console.log("need all arguements for creating pet...")
        } else {
            fs.writeFile('pets.json', petJSON, function (error) {
                if (error) {
                    res.status(400)
                    res.end('An Error has occurred in writing this file...')
                }
            })
        }
    })
})

app.listen(`${port}`, (req, res) => {
    console.log(`listening on ${port}`)
})