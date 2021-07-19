const path = require("path");
const express = require("express");
const hbs = require("express-hbs");
var app = express();

const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath:"./veritabani.json"
});

/*
{{veriler.map(v => `<tr><td>${v.ad}</td><td>${v.soyad}</td></tr>`).join("\n")}}
*/

app.use(express.urlencoded());

app.set('view engine', 'hbs');

app.get("/", (istek, yanit) => {
    yanit.sendFile(path.join(__dirname, '/index.html'))
})

app.post("/istek", (istek, yanit) => {
    console.log(istek.body.isim)
    console.log(istek.body.soyad)

    db.push("veriler", {
        ad: istek.body.isim,
        soyad: istek.body.soyad
    })

var veri = {
    veriler: db.get("veriler")
}

yanit.render(path.join(__dirname, '/index.hbs'), veri)

/*
    yanit.send(`
Yolladığınız veriler:
İsim: ${istek.body.isim}
Soyad: ${istek.body.soyad}    
`)
*/
})

app.listen(9999)