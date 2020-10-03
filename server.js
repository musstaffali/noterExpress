const path = require("path");
const express = require("express");
const { console } = require("console");
const app = express();

const PORT = 8000;

// API Routes

// GET /api/notes
// get data somehow from db.json
// return res.json(data)

// POST .api/notes
// receive JSONN obj from the front end
// return res.status(200).end();

// DELETE /api/notes/:id


// HTML Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
});


// get * => index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});