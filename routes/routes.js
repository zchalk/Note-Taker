const path = require('path');
const {uid} = require('uid');
const util = require('util');
const fs = require('fs');



module.exports = (app) => {

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))});
 
app.get('/api/notes', async (req, res) => {
    try {
    const noteData = await readFile(path.join(__dirname,"../db/db.json"), "utf8");
    const noteArr = JSON.parse(noteData);
    res.json(noteArr);
    } catch(err) {
        console.log(err);

}
});

app.post('/api/notes', async (req, res) => {
    try {
    const noteData = await readFile(path.join(__dirname,"../db/db.json"), "utf8");
    const noteArr = JSON.parse(noteData);
    req.body.id = uid(32);
    noteArr.push(req.body);
    await writeFile(path.join(__dirname,"../db/db.json"),JSON.stringify(noteArr));
    res.json(noteArr);
    } catch(err) {
        console.log(err);
    }
});
 app.delete('/api/notes/:id', async (req, res) => {
     try {
     const noteData = await readFile(path.join(__dirname,"../db/db.json"), "utf8");
     const noteArr = JSON.parse(noteData);
     const noteID = req.params.id;
     const newNoteArr = noteArr.filter(note => note.id !== noteID);
     await writeFile(path.join(__dirname,"../db/db.json"),JSON.stringify(newNoteArr));
     res.json(newNoteArr);
     } catch(err) {
        console.log(err);
     }

 });


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))});
};
