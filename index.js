const express = require('express')

const bodyParser = require('body-parser')
const webhooks = require('node-webhooks')


const app = express()

const hooks = new webhooks ({
    db:{
        'callback_hook':['http://localhost:9000/cb']
    }
})

app.get('/', (req, res)=>{
    hooks.trigger('callback_hook', {msg: 'success trigged'})
    return res.status(200).send('webhook trigged')
})
app.post('/', (req, res)=>{
    console.log("inside callback hooks ", req.body);
    return res.status(200).end()
})


app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
app.listen(9000, ()=> console.log("server is running"))