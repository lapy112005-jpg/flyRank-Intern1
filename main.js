import express from "express"

const app = express()

app.use(express.json())

app.get("/" , (req,res,next)=>{
    res.json({message:"hello world"})
})

app.listen(3000 , ()=>{
    console.log("server run on port 3000🚄🚄");
    
})