const express = require('express');
const ejs = require('ejs');
const fileUpload=require('express-fileupload')
const app = express();
const path=require('path');

app.listen(8000,()=>console.log("Server started..."))

app.set('view engine','ejs');



app.get('/', (req, res) => {
    res.render('index');
  });

app.post('/uploads',
    fileUpload({createParentPath:true}),
    (req, res) => {
    files=req.files;
    Object.keys(files).forEach(key=>{
      const filepath=path.join(__dirname,'files',files[key].name)
      files[key].mv(filepath),(err)=>{
        return res.status(400).json({'status':"error",message:err })
      }
    })
    return res.json({'status':'success','message':Object.keys(files).toString()});
  });

