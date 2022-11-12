import express from "express";
import cors from "cors";

// load environment variables
// don't delete even though it looks unused
import env from "./env.js"

// database imports
import sequelize from "./sequelize.js";
import Song from "./models/song.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Test endpoint" });
});

app.get('/songs', async (req, res) => {
    const songs = await Song.findAll()
    res.json(songs)
})

app.post('/songs', async (req, res) => {
    const songs = await Song.create({
        title: req.body.title
    })
    res.json(songs)
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});