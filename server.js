const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"))

//routes 
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))});

app.get('/api/notes', async (req, res) => {
    const noteData = await readFile(path.join(__dirname,"/db/db.json"), "utf8");
    const noteArr = JSON.parse(noteData);
    res.json(noteArr);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))});






app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });