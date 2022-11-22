import { Client } from "spotify-api.js";

const client = await Client.create({ token: { clientID: process.env.SPOTIFY_CLIENT_ID, clientSecret: process.env.SPOTIFY_CLIENT_SECRET } });

export default client