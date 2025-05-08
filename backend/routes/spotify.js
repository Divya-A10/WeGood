const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");
const router = express.Router();

// Spotify API setup using spotify-web-api-node
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Authenticate with Spotify API
spotifyApi.clientCredentialsGrant().then(
  function (data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log("Error retrieving access token:", err);
  }
);

// Function to get a mood-based playlist using spotify-web-api-node
function getMoodPlaylist(mood) {
  return spotifyApi.searchTracks(mood).then(
    function (data) {
      const tracks = data.body.tracks.items;
      return tracks.map((track) => ({
        name: track.name,
        artist: track.artists[0].name,
        url: track.external_urls.spotify,
      }));
    },
    function (err) {
      console.log("Error searching tracks:", err);
    }
  );
}

// Route to get mood-based music using axios
router.get("/mood-music/:mood", async (req, res) => {
  const { mood } = req.params;
  try {
    const playlistMap = {
      Happy: "37i9dQZF1DXdPec7aLTmlC",
      Neutral: "37i9dQZF1DX4WYpdgoIcn6",
      Stressed: "37i9dQZF1DWZqd5JICZI0u",
      Depressed: "37i9dQZF1DX3YSRoSdA634",
    };
    const playlistId = playlistMap[mood] || "37i9dQZF1DX4WYpdgoIcn6";

    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;
    const spotifyResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.status(200).send({ music: spotifyResponse.data });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    res.status(500).send("Error fetching Spotify data");
  }
});

// Export both the router and the getMoodPlaylist function
module.exports = { router, getMoodPlaylist };