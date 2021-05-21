// Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const db = "./db/db.json";

// Setting up express app and port
const app = express();
const PORT = process.env.PORT || 3000;
let id;

// Setting up the express app to be able to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes

// HTML routing, sends user to correct pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

fs.readFile(db, (err, data) => {
  if (err) {
    return console.log(err);
  }

  let notes = JSON.parse(data);
  console.log(notes);

  // API routing
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNotes = req.body;
    notes.push(newNotes);

    updateFile();
  });

  app.delete("/api/notes/:id", (req, res) => {
    if (err) {
      return console.log(err);
    }

    for (i = 0; i < notes.length; i++) {
      console.log(parseInt(req.params.id));
      console.log(parseInt(notes[i].id));
      if (parseInt(notes[i].id) === parseInt(req.params.id)) {
        notes.splice([i], 1);
      }
    }

    updateFile();
  });

  function updateFile() {
    fs.writeFile(db, JSON.stringify(notes), (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
