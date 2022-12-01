import express from "express";
import cors from "cors";

// load environment variables
// don't delete even though it looks unused
import env from "./env.js"

// database imports
import sequelize from "./sequelize.js";
import models from "./models/models.js";


import spotify from "./spotify.js";

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

    // if song has already been requested,
    // increment vote count instead of creating new record
    const existingRequest = await models.Request.findOne({where: {spotify_song_id: req.body.song.id}})
    if(existingRequest){
        existingRequest.vote_count++
        await existingRequest.save()
        res.json(existingRequest)
        return
    }

    // add new record if not already requested
    const songRequest = await models.Request.create({
        title: req.body.song.name,
        spotify_song_id: req.body.song.id,
        artist: req.body.song.artists.map(a => a.name).join(', '),
        vote_count: 1,
        request_played: false,
    })

    // get song metadata from spotify
    const features = await spotify.tracks.getAudioFeatures(songRequest.spotify_song_id);

    // generate recommendations
    // multiple seed tracks? That's interesting
    const recomendationRequest = await spotify.browse.getRecommendations({
        seed_tracks: songRequest.spotify_song_id,
        target_danceability: features.danceability,
        target_energy: features.energy,
        target_key: features.key,
        target_mode: features.mode,
        target_tempo: features.tempo,
        target_valence: features.valence,
        limit: 4,
    })
    // the first recommendation seems to always be a clone of the original song, skip it
    const recommendations = recomendationRequest.tracks.slice(1)

    recommendations.forEach(async (track) => {
        await models.Recommendation.create({
            title: track.name,
            spotify_song_id: track.id,
            artist: track.artists.map(a => a.name).join(', '),
            RequestRequestId: songRequest.request_id,
        })
    })
    
    res.json(songRequest)
})

// search
// this endpoint gets hit constantly while the user is typing in a song request
// to generate a list of possible songs they are looking for
app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    const searchResults = await spotify.search(req.params.query, {types: ['track']})
    console.log(searchResults);
    res.json(searchResults.tracks)
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});