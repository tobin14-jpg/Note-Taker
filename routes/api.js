const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const router = express.Router();
const dbPath = path.join(__dirname, '..', 'db', 'db.json');
function getNotesFromDb(){
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8') || []);
}

function saveNotesToDb(content) {
    fs.writeFileSync(dbPath, content)
}

router.get('/api/notes', (req, res) => {
    const notes = getNotesFromDb();

    res.json(notes)

    
})

router.post('/api/notes', (req, res) => {

        const notes = getNotesFromDb();

        const text = req.body.text;

        const title = req.body.title;

        const id = uuid.v4();

        notes.push({
            text,
            title,
            id,
        });
        fs.writeFileSync(dbPath, JSON.stringify(notes));

        res.json({
            data: "success"
        })

});

router.delete('/api/notes/:id', (req, res) => {
    // read note
    const notes = getNotesFromDb();
    // filter out the note we want to delete
    const filtered = notes.filter((note) => {
        return note.id !== req.params.id
    })

    console.log(filtered);
    // resave the note
    saveNotesToDb(JSON.stringify(filtered));

    res.json({
        data: "deleted"
    })

})

module.exports = router;