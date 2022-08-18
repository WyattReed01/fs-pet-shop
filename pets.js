let fs = require('fs')

let command = process.argv[2]
let index = process.argv[3]

if (!command) {
    console.log("Usage: node pets.js [read | create | update | destroy]")
}


if (command === 'read' && !index) {
    fs.readFile('pets.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("trash")
            process.exit(1)
        }

        let parsedData = JSON.parse(data);
        console.log(parsedData)

    })
}


if (command === 'read' && index) {
    fs.readFile('pets.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("trash")
            process.exit(1)
        }
        let index = process.argv[3]
        let parsedData = JSON.parse(data);

        if (index < 0 || index >= parsedData.length) {
            console.error("need valid index")
        }

        console.log(parsedData[index])

    })
}

if (command === "create") {
    fs.readFile('pets.json', 'utf-8', (err, data) => {
        if (err) {
            console.log("trash")
            process.exit(1)
        }

        const age = parseInt(index)
        const kind = process.argv[4]
        const name = process.argv[5]

        const pet = { age, kind, name }
        const parsedData = JSON.parse(data)
        parsedData.push(pet)

        const petJSON = JSON.stringify(parsedData)

        if (!age || !kind || !age) {
            console.log("need all arguements for creating pet...")
        } else {
            fs.writeFile('pets.json', petJSON, function (error) {
                if (error) {
                    console.log('something went wrong')
                    process.exit(1)
                }
            })
        }

    })

}