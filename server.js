const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");


const PORT = process.env.PORT || 8000;


// App to handle data parsing
app.use(express.urlencoded({extended: true}));

app.use(express.json());


// css links public folder
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Note List
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("your on note taker page");
});


// Route notes as json in the MYSQL
app.get("/api/notes", (err, res) => {
    let newNotes;
    try {
        newNotes = fs.readFileSync("db/db.json", "utf8");
        newNotes = JSON.parse(newNotes);
        console.log(newNotes);
    } catch (err) {
        console.log("\n error(in app.get.catch):");
        console.error(err);
    }
    res.json(newNotes);
});

//Notes store in MYSQL
app.post("/api/notes", (req, res) => {
    try {
        newNotes = fs.readFileSync("db/db.json", "utf8");
        newNotes = JSON.parse(newNotes);

        // data presented in body
        newNotes.push(req.body)

        newNotes = JSON.stringify(newNotes);

        // Gather string for user
        fs.writeFile("db/db.json", newNotes, "utf8", function (err) {
            if (err) 
            throw err;
        });
      console.log(newNotes);

    }
    catch (err) {
        console.log("\n error(in app.post.catch):");
        console.error(err);
    }
    res.json(JSON.parse(newNotes));

});


// Delete
app.delete("/api/notes/:id", (req, res) => {

    let newNotes = []
    newNotes.splice(req.params.id);
    fs.writeFile("db/db.json", JSON.stringify(newNotes), "utf8", function (err) {
        console.log(err);
    });
    res.json(newNotes);
});

// Server is listening 
app.listen(PORT, () => {
    console.log("the server is listening on PORT: " + PORT);
});

