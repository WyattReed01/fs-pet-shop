const express = require('express')
const app = express();
const port = 8888
const fs = require('fs');
const {Pool} = require('pg')
const pool = new Pool({
    user: 'Wickd',
    password: 'whatever',
    host: 'localhost',
    port: 5432,
    database: 'petshop_dev'
});

app.use(express.json())

app.get('/', async (req, res)=>{
    try{
        let getPet = await pool.query('SELECT * FROM pets');
        let rows = getPet.rows;
        res.send(rows)
    } catch (error){
        console.error(error)
    }
})

app.get('/pets/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const {rows} = await pool.query('SELECT * FROM pets WHERE id = $1;', [id])
        res.send(rows)
    } catch (error) {
        res.send(error.message)
    }
})

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

app.post('/petadd', async (req,res)=>{
    try {
        const {name, kind, age} = req.body
        const {rows} = await pool.query('INSERT INTO pets (name, kind, age) VALUES($1, $2, $3) RETURNING *;', [name, kind, age])
        res.send(rows)
    } catch (error) {
        console.log(error.message)
    }
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

app.put('/petedit/:id', async (req, res)=>{
    const { id } = req.params
    const {name, kind, age} = req.body
    try {
        const { rows } = await pool.query('UPDATE pets SET name = $1, kind = $2, age = $3 WHERE id = $4;', [name, kind, age, id])
        res.send(rows)
    } catch (error) {
        res.send(error.message)
    }
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

app.delete('/petdel/:id', async (req, res)=>{
    const {id} = req.params
    try {
        const {rows} = await pool.query('DELETE FROM pets WHERE id =$1;', [id])
        res.send(rows)
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(port, (req, res) => {
    console.log(`listening on ${port}`)

})