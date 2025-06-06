const request = require("supertest");
const express = require("express");
const { router: spotifyRouter, getMoodPlaylist } = require("../routes/spotify");

jest.mock("spotify-web-api-node");

const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use("/api/spotify", spotifyRouter);

describe("Spotify API tests", () => {
  let mockSearchPlaylists;

  beforeAll(() => {
    mockSearchPlaylists = jest.fn();

    SpotifyWebApi.mockImplementation(() => ({
      clientCredentialsGrant: jest.fn().mockResolvedValue({
        body: { access_token: "mockToken" },
      }),
      setAccessToken: jest.fn(),
      searchPlaylists: mockSearchPlaylists,
    }));
  });

  test("GET /api/spotify/mood-music/:mood returns playlists", async () => {
    mockSearchPlaylists.mockResolvedValue({
      body: {
        playlists: {
          items: [
            {
              name: "Happy Hits",
              owner: { display_name: "SpotifyUser" },
              external_urls: { spotify: "https://open.spotify.com/playlist/1" },
              images: [{ url: "https://image.url" }],
            },
          ],
        },
      },
    });

    const res = await request(app).get("/api/spotify/mood-music/happy");

    expect(res.statusCode).toBe(200);
    expect(res.body.playlists).toHaveLength(1);
    expect(res.body.playlists[0].name).toBe("Happy Hits");
  });

  test("GET /api/spotify/mood-music/:mood returns empty array on error", async () => {
    mockSearchPlaylists.mockRejectedValue(new Error("API error"));

    const res = await request(app).get("/api/spotify/mood-music/sad");

    expect(res.statusCode).toBe(200);
    expect(res.body.playlists).toEqual([]);
  });
});
