const express = require("express")
const server = require("./api/server")
const path = require('path')
require('dotenv').config()
server.use(express.json())
server.use(express.static(path.join(__dirname,"client/build")))
const port = process.env.PORT||4000

if(process.env.NODE_ENV==="development"){
    console.log(process.env.NODE_ENV)
const cors = require("cors")
server.use(cors())
server.use('*',(req, res, next) =>{
res.sendFile(path.join(__dirname,"client/build","index.html"))
})
}
server.listen(port, ()=>{
    console.log(`server running on ${port}`)
})
