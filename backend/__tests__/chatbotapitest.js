const request = require("supertest");
const express = require("express");
const chatbotRouter = require("../routes/chatbotapi");
const { GoogleGenerativeAI } = require("@google/generative-ai");

jest.mock("@google/generative-ai");

const app = express();
app.use(express.json());
app.use("/api/chatbot", chatbotRouter);

describe("Chatbot API tests", () => {
  let mockGenerateContent;

  beforeAll(() => {
    mockGenerateContent = jest.fn();

    // Mock GoogleGenerativeAI class
    GoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerateContent,
      }),
    }));
  });

  test("POST /api/chatbot/chat returns bot message", async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => "This is a mocked chatbot reply.",
      },
    });

    const res = await request(app)
      .post("/api/chatbot/chat")
      .send({ message: "Hello" });

    expect(res.statusCode).toBe(200);
    expect(res.body.botMessage).toBe("This is a mocked chatbot reply.");
  });

  test("POST /api/chatbot/chat with no message returns 400", async () => {
    const res = await request(app).post("/api/chatbot/chat").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("No message provided.");
  });

  test("POST /api/chatbot/chat returns 500 on error", async () => {
    mockGenerateContent.mockRejectedValue(new Error("API failure"));

    const res = await request(app)
      .post("/api/chatbot/chat")
      .send({ message: "Hello" });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Something went wrong.");
  });
});
