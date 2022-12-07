import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"


// load environment variables
// don't delete even though it looks unused
import env from "./env.js"

// database imports
import sequelize from "./sequelize.js";
import { Request, Recommendation } from "./models/models.js";


import spotify from "./spotify.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// function that updates dj page when something changes
async function updateDJPage() {
    const requests = await Request.findAll({include : [Recommendation]});
    io.emit("update", requests);
}

// get list of requests
app.get('/requests', async (req, res) => {
    const requests = await Request.findAll()
    console.log(requests)
    res.json(requests)
})

// create request
app.post('/requests', async (req, res) => {

    // if song has already been requested,
    // increment vote count instead of creating new record
    const existingRequest = await Request.findOne({where: {spotify_song_id: req.body.song.id}})
    if(existingRequest){
        existingRequest.vote_count++
        await existingRequest.save()
        res.json(existingRequest)
        return
    }

    // add new record if not already requested
    const song = req.body.song;
    console.log(song)
    // get song metadata from spotify
    const features = await spotify.tracks.getAudioFeatures(song.id);
    const songRequest = await Request.create({
        title: song.name,
        spotify_song_id: song.id,
        artist: song.artists.map(a => a.name).join(', '),
        vote_count: 1,
        request_played: false,
        album_art: song.album.images[0].url,
        bpm: features.tempo,
        length: features.duration_ms,
        key: features.key,
    })

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

    for (let track of recommendations) {
        const features = await spotify.tracks.getAudioFeatures(track.id);
        await Recommendation.create({
            title: track.name,
            spotify_song_id: track.id,
            artist: track.artists.map(a => a.name).join(', '),
            RequestRequestId: songRequest.request_id,
            album_art: track.album.images[0].url,
            bpm: features.tempo,
            length: features.duration_ms,
            key: features.key,
        });
    }

    await updateDJPage();

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

// socket interface here updates the recommendations page with necessary recommendations
io.on('connection', (socket) => {
    
    socket.on('DJ Page', (socket) => {
        updateDJPage();
    });

    socket.on('disconnect', (socket) => {
        console.log('Disconnected from dj page');
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.post('/upvote/:songid', async (req, res)=> {
    let songRequest = await Request.findOne({where:{request_id:req.params.songid}});
    songRequest.vote_count++;
    await songRequest.save();
    res.json(songRequest);
});

app.post('/downvote/:songid', async (req, res)=> {
    let songRequest = await Request.findOne({where:{request_id:req.params.songid}});
    songRequest.vote_count--;
    if(songRequest.vote_count < 0) songRequest.vote_count = 0;
    await songRequest.save();
    res.json(songRequest);
});