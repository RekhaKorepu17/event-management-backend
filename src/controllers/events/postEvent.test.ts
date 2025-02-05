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

describe("POST /events", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new event", async () => {
    const mockEvent = {
      name: "Sample Event",
      organizerName: "Rekha",
      eventDate: "2024-12-25",
      startTime: "10:00",
      endTime: "12:00",
    };

    const formattedEvent = {
      ...mockEvent,
      eventDate: new Date(mockEvent.eventDate),
      startTime: new Date(`${mockEvent.eventDate}T${mockEvent.startTime}:00`),
      endTime: new Date(`${mockEvent.eventDate}T${mockEvent.endTime}:00`),
    };

    (Event.findOne as jest.Mock).mockResolvedValue(null);
    (EventClass as jest.Mock).mockImplementation(() => formattedEvent);
    (Event.create as jest.Mock).mockResolvedValue(formattedEvent);

    const response = await request(app).post("/events").send({ event: mockEvent });

    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        name: "Sample Event",
        organizerName: "Rekha",
        eventDate: new Date("2024-12-25"),
      },
    });

    expect(Event.create).toHaveBeenCalledWith(formattedEvent);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Event created" });
  });

  test("should return 409 if the event already exists", async () => {
    const existingEvent = {
      name: "Sample Event",
      organizerName: "Rekha",
      eventDate: new Date("2024-12-25"),
    };

    (Event.findOne as jest.Mock).mockResolvedValue(existingEvent);

    const response = await request(app).post("/events").send({ event: existingEvent });

    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        name: "Sample Event",
        organizerName: "Rekha",
        eventDate: new Date("2024-12-25"),
      },
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "Event already created" });
  });

  test("should return 500 if an error occurs while creating an event", async () => {
    const event = {
      name: "Sample Event",
      organizerName: "Rekha",
      eventDate: "2024-12-25",
    };

    (Event.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/events").send({ event });

    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        name: "Sample Event",
        organizerName: "Rekha",
        eventDate: new Date("2024-12-25"),
      },
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Failed to create event",
      error: "Database error",
    });
  });
});

