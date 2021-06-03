const express = require("express")
const server = express()
require('dotenv').config()
server.use(express.json())
const port = process.env.PORT||4000

if(process.env.NODE_ENV==="development"){
    console.log(process.env.NODE_ENV)
const cors = require("cors")
server.use(cors())
}
server.listen(port, ()=>{
    console.log(`server running on ${port}`)
})
