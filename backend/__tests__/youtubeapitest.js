const axios = require("axios");
const { getRelaxationVideo } = require("../routes/youtubeapi");

jest.mock("axios");

describe("YouTube API function tests", () => {
  test("getRelaxationVideo returns videoId", async () => {
    const mockVideoId = "mockVideo123";
    axios.get.mockResolvedValue({
      data: {
        items: [{ id: { videoId: mockVideoId } }],
      },
    });

    const videoId = await getRelaxationVideo();

    expect(videoId).toBe(mockVideoId);
  });

  test("getRelaxationVideo throws error on failure", async () => {
    axios.get.mockRejectedValue(new Error("API failed"));

    await expect(getRelaxationVideo()).rejects.toThrow("Failed to fetch YouTube video");
  });
});
