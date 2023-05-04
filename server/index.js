const express = require("express");

const bodyParser = require('body-parser')

const path = require('path')

const db = require('./queries')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true,}))

app.use(express.static(path.resolve(__dirname,'../client/favlinks/build')))

app.get('/', (req,res) => {res.sendFile(path.resolve(__dirname,'../client/favlinks/build','index.html'))})

app.get("/links", db.getLinks);

app.get("/links/:id", db.getLinkById);

app.post("/links", db.createLink);

app.put("/links/:id", db.updateLink);

app.delete("/links/:id", db.deleteLink);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});