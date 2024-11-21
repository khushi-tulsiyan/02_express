    require('dotenv').config()
    import express from 'express'

    const app = express()

    const port = 3000

    app.use(express.json())

    let coffeedata = []
    let nextId = 1

    app.post('/coffee', (req, res) => {
        const {name, price} = req.body
        const newCoffee = {id: nextId++, name, price}
        coffeedata.push(newCoffee)
        res.status(201).send(newCoffee)
    })

    app.get('/coffee/:id', (req, res) => {
        const coffee = coffeedata.find(c =>c.id === parseInt(req.params.id))
        if(!coffee){
            return res.status(404).send('Coffee not found')
        }

        res.send(200).send(coffee)
    })

    //update coffee

    app.put('/coffee/"id', (req, res) => {
        const coffeeId = req.params.id
        const coffee = coffeedata.find(c =>c.id === parseInt(req.params.id))

        if(!coffee){
            return res.status(404).send('coffee not found')
        }

        const{name, price} = req.body
        coffee.name = name
        coffee.price = price
        res.send(200).send(coffee)

    })

    //delete coffee

    app.delete('/coffee/:id', (req,res) => {
        const index = coffeedata.findIndex(t => t.id === parseInt(req.params.id))
        if(index === -1){
            return res.status(404).send("index not found")
        }

        coffeedata.splice(index, 1)
        return res.status(204).send("deleted")
    })

    app.get('/coffee', (req, res) => {
        res.status(200).send(coffeedata)
    })

    app.get("/doofus", (req,res) => {
        res.send("i love you")
    })

    app.get("/doof", (req,res) => {
        res.send("i miss you")
    })

    app.get("/", (req,res) => {
        res.send("Hello doofus.")
    })
    app.listen(port, () => {
        console.log("server is listening at port: ${port}...")
    })