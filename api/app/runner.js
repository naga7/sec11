const express = require("express")
const app =express()
require("../database/connecttion")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userrout =require("../routes/user.routes")
app.use("/api/user",userrout)
app.all("*",(req,res)=>{
        res.status(404).send({apiStatus:false,data:null,message:"invalid url"})
})






module.exports= app