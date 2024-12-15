import request from "supertest";
import express, { Express } from "express";
import { postEvent } from "./postEvent";
import Event from "../../models/event";
import { Event as EventClass } from "../../services/Event";

jest.mock("../../models/event");
jest.mock("../../services/Event");

const app: Express = express();
app.use(express.json());
app.post("/events", postEvent);

describe("post route for events", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new event", async () => {
    const mockEvent = {
      name: "Sample Event",
      organizerName: "Rekha",
      Date: "2024-12-25",
    };
    (Event.findOne as jest.Mock).mockResolvedValue(null);
    const eventInstance = { ...mockEvent, id: 1 };
    (EventClass as jest.Mock).mockImplementation(() => eventInstance);
    (Event.create as jest.Mock).mockResolvedValue(eventInstance);

    const response = await request(app)
      .post("/events")
      .send({ event: mockEvent });

    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        name: "Sample Event",
        organizerName: "Rekha",
        Date: "2024-12-25",
      },
    });
    expect(Event.create).toHaveBeenCalledWith(eventInstance);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Event created" });
  });

  test("should return 409 status if the event already exists", async () => {
    const event = {
      name: "Sample Event",
      organizerName: "Rekha",
      Date: "2024-12-25",
    };
    (Event.findOne as jest.Mock).mockResolvedValue(event);

    const response = await request(app).post("/events").send({ event: event });

    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        name: "Sample Event",
        organizerName: "Rekha",
        Date: "2024-12-25",
      },
    });
    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "Event already created" });
  });

  test("Should return return error if failed to create an event", async () => {
    const event = {
      name: "Sample Event",
      organizerName: "Rekha",
      Date: "2024-12-25",
    };
    (Event.findOne as jest.Mock).mockRejectedValue(
      new Error("Error creating the event")
    );
    const response = await request(app).post("/events").send({ event: event });
    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        name: "Sample Event",
        organizerName: "Rekha",
        Date: "2024-12-25",
      },
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Failed to create event",
      error: "Error creating the event",
    });
  });
});
