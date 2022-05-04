const path = require("path");
const express = require("express");
const hbs = require("express-hbs");
var app = express();

const Demirdb = require("demirdb");

  const db = new Demirdb({});

if(!db.has("datas")) db.set("datas", [])

app.use(express.urlencoded());

app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get("/data", (req, res) => {
    var data = {
        datas: (db.get("datas") || [])
    }
    
    res.render(path.join(__dirname, '/index.hbs'), data)
})

app.post("/post", (req, res) => {

    db.push("datas", {
        ad: req.body.name,
        soyad: req.body.surname
    })

var data = {
    datas: db.get("datas")
}

res.render(path.join(__dirname, '/index.hbs'), data)
})

app.listen(9999)
