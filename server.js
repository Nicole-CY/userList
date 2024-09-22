const express = require('express')
const router = require('./router')
const cors = require('cors')

const app = express() //create a web server
app.use(express.json()) //JSON 解析中间件 parse json request bodies
app.use(cors()) // Enable CORS for all routes
app.use('/api',router) // Use router middleware

const port = 8000
app.listen(port,function(){
    console.log(`Server is running on port ${port}`)
    console.log(`http://localhost:${port}`)
})


