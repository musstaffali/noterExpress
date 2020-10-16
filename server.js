const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

const PORT = 8000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', "index.html"));
  });
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', "notes.html"));
  });
  
app.get("/api/notes", function (req, res) {


});



app.post("/api/notes", function (req, res) {

    var newNoteEntry = req.body;

    newNoteEntry.id = note.length+1;

    console.log(newNoteEntry);

    note.push(newNoteEntry);



    fs.writeFileSync("./db/db.json", JSON.stringify(note), function (err) {

        if (err)
            throw (err)

    });

    return res.status(200).end();
});


app.delete("/api/notes/:id", function (req, res) {


note = note.filter(note => note.id != req.params.id);
    

fs.writeFileSync("./db/db.json", JSON.stringify(note), "UTF8", function (err) {

    if (err)
        throw (err)

})


return res.json(note);

});


app.use(express.static("public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
});


// get * => index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});



app.listen(PORT, () => {
    console.log("test")
    console.log(`The server is running on http://localhost:${PORT}/`);
});