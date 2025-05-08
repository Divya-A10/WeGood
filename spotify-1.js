// spotify.js
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'YOUR_SPOTIFY_CLIENT_ID',
  clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI'
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Error retrieving access token:', err);
  }
);

function getMoodPlaylist(mood) {
  return spotifyApi.searchTracks(mood).then(
    function(data) {
      const tracks = data.body.tracks.items;
      return tracks.map(track => ({
        name: track.name,
        artist: track.artists[0].name,
        url: track.external_urls.spotify
      }));
    },
    function(err) {
      console.log('Error searching tracks:', err);
    }
  );
}

module.exports = { getMoodPlaylist };
