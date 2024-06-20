const express=require("express");
const app=express();
const fs=require('fs');
const html=fs.readFileSync('./static/htmltrial.html');
const cors=require('cors');

app.use(express.static('./static'));
app.use(cors());

app.get('/',(req,res)=>{
    res.end(html);
})

app.listen('3003',()=>{
    console.log("htmlServer is listning on port 3003");
})