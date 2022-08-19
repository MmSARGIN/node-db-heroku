const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./db.json');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/users" , (req, res)=> {
    console.log("req geldi");
    res.send(200,db)
});
app.get("/users/:id" , (req, res)=> {
    if(isNaN(req.params.id)){
            res.send(400, {
            message : "Unprocessable Entry"
        })
    }else {
        const user = db.find (u => u.id == req.params.id)
        if(user){
            res.send(200, user)
        }else{
            res.send(404, {
                message: "User not defined"
            })
        }
    }
});
app.post("/users" , (req, res)=> {
    console.log(req.body);
    const willSaveData = {
        id: new Date().getTime(),
        full_name : req.body.full_name,
        contry : req.body.country,
        email : req.body.email,
        created_at: new Date()
    }
    db.push(willSaveData);
    res.send(willSaveData);
});
app.patch("/users/:id" , (req, res)=> {
    if(isNaN(req.params.id)){
        res.send(400, {
        message : "Unprocessable Entry"
    })
}else {
    const user = db.find (u => u.id == req.params.id)
    if(user){
        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        })
        res.send(200, "islem basarili");
    }else{
        res.send(404, {
            message: "User not defined"
        })
    }
}
});
app.delete("/users/:id" , (req, res)=> {
    if(isNaN(req.params.id)){
        res.send(400, {
        message : "Unprocessable Entry"
    })
}else {
    const userIndex = db.findIndex(u => u.id == req.params.id)
    if(userIndex > -1){
        db.splice(userIndex, 1);
        res.send(200, {
            message : "KullANICI SİLİNDİ"
        });
    }else{
        res.send(404, {
            message: "User not defined"
        })
    }
}
});

app.listen(process.env.PORT || 3000 , () => {
    console.log("sunucu ayakta");
})


