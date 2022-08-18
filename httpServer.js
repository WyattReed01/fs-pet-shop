const http = require('http');
const fs = require('fs')
const port = 7777

const server = http.createServer();


server.on('request', function (req, res) {
    // res.end('something new')

    const items = req.url.split('/');

    if (items.length > 2) {
        fs.readFile('pets.json', 'utf-8', function (err, data) {
            if (err) {
                console.log("trash")
                process.exit(1)
            }

            const petData = JSON.parse(data)
            const index = items[items.length - 1]
            console.log(petData)

            if (index < 0) {
                res.status = 404
                res.setHeader('Content-Type', 'text/plain')
                res.end('Not Found')
            } else if (index >= petData.length) {
                res.status = 404
                res.setHeader('Content-Type', 'text/plain')
                res.end('Not Found')
            } else {
                res.status = 200
                res.setHeader('Content-Type', 'application/json')
                const elem = petData[Number(index)]
                res.end(JSON.stringify(elem))
            }
        })
    }

    if (req.url === '/pets') {
        fs.readFile('pets.json', 'utf-8', function (err, data) {
            if (err) {
                console.log("trash")
                process.exit(1)
            }


            res.status = 200;
            res.setHeader('Content-type', 'application/json')
            res.end(data)
        })

    }

})


server.listen(port, function () {
    console.log(`listening on port: ${port}`)
})