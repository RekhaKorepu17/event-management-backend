import request from "supertest";
import express, { Express } from "express";
import { fetchEvents } from "./event";
import Event from "../../models/event";

jest.mock("../../models/event");

const app: Express = express();
app.use(express.json());
app.get("/events", fetchEvents);

describe("get route for events", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("return 200 status and fetch all events", async () => {
    const mockEvents = [
      { id: 1, name: "Event 1", organizerName: "Rekha", Date: "2024-12-25" },
      { id: 2, name: "Event 2", organizerName: "Anush", Date: "2024-12-30" },
    ];
    (Event.findAll as jest.Mock).mockResolvedValue(mockEvents);
    const response = await request(app).get("/events");
    expect(Event.findAll).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Events retrieved succesfully",
      events: mockEvents,
    });
  });

  test("should return 500 status if there is any error while fertching events", async () => {
    (Event.findAll as jest.Mock).mockRejectedValue(
      new Error("Error retrieving events")
    );
    const response = await request(app).get("/events");
    expect(Event.findAll).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Failed to fetch events",
      error: "Error retrieving events",
    });
  });
});
