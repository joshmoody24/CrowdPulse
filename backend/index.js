import express from "express";
import cors from "cors";

// load environment variables
// don't delete even though it looks unused
import env from "./env.js"

// database imports
import sequelize from "./sequelize.js";
import Request from "./models/Request.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// get list of requests
app.get('/requests', async (req, res) => {
    const requests = await Request.findAll()
    res.json(requests)
})

// create request
app.post('/requests', async (req, res) => {
    const songs = await Song.create({
        title: req.body.title
    })
    res.json(songs)
})

// search
// this endpoint gets hit constantly while the user is typing in a song request
// to generate a list of possible songs they are looking for
app.get('/search', async (req, res) => {
    res.send("NOT IMPLEMENTED")
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});