// youtube.js
const axios = require('axios');

async function getRelaxationVideo() {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: 'breathing exercises for relaxation',
                key: process.env.YOUTUBE_API_KEY,
                maxResults: 1,
            }
        });
        return response.data.items[0].id.videoId;
    } catch (error) {
        console.error('Error with YouTube API:', error);
        throw new Error('Failed to fetch YouTube video');
    }
}

module.exports = { getRelaxationVideo };
