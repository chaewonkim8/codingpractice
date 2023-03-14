const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/sound/:name', function (req, res) {
    const {name} = req.params
    if (name == 'dog')
    {
        res.json({'sound': '멍멍'})
    }
    else if (name == 'cat')
    {
        res.json({'sound': '야옹'})
    }
    else if (name == 'pig')
    {
        res.json({'sound': '꿀꿀'})
    }
    else
    {
        res.json({'sound': '알수없음'})
    }    
    //res.send('Hello World')
})


app.get('/dog', function (req, res) {
    res.send({'sound':'멍멍'})
})

app.get('/user/:id', function (req, res) {
    // const q = req.params
    // console.log(q)
    const q = req.query
    console.log(q)
    res.send({'query':q.name})
})

app.get('/cat', function (req, res) {
    res.send({'sound':'야옹'})
})

app.listen(3000)