const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");
const router = express.Router();

router.post("/data", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Spotify API Error:", error);
    res.status(500).send("Error fetching Spotify data");
  }
});

module.exports = router;

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
  // Use the searchPlaylists method instead of searchTracks to get playlists
  return spotifyApi.searchPlaylists(mood, { limit: 5 }).then( // limit to 5 playlists
    function (data) {
      const playlists = data.body.playlists.items;
      return playlists.map((playlist) => ({
        name: playlist.name,
        owner: playlist.owner.display_name,
        url: playlist.external_urls.spotify,
        imageUrl: playlist.images.length > 0 ? playlist.images[0].url : null, // Get playlist image
      }));
    },
    function (err) {
      console.log("Error searching playlists:", err);
      return []; // Return empty array in case of error
    }
  );
}

// Route to get mood-based music using spotify-web-api-node
router.get("/mood-music/:mood", async (req, res) => {
  const { mood } = req.params;
  try {
    const playlists = await getMoodPlaylist(mood); // Use the getMoodPlaylist function
    res.status(200).send({ playlists: playlists }); // Send back playlists
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    res.status(500).send("Error fetching Spotify data");
  }
});

// Export both the router and the getMoodPlaylist function
<<<<<<< HEAD
module.exports = router;
=======
module.exports = { router, getMoodPlaylist };
>>>>>>> 5c177d7 (updates from firebase)
