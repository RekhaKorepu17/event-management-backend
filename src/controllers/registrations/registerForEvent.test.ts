import request from "supertest";
import express, { Express } from "express";
import { registerForEvent } from "./registerForEvent";
import Registration from "../../models/registration";

jest.mock("../../models/registration");

const app: Express = express();
app.use(express.json());
app.post("/user/event-registration", registerForEvent);

describe("tests event registration route", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should test event registration route", async () => {
        const registration = {
            eventId: 1,
            userId: 1,
            Date: expect.any(Number),
            status: "registered",
        };

        (Registration.findOne as jest.Mock).mockResolvedValue(null);
        (Registration.create as jest.Mock).mockResolvedValue(registration);

        const response = await request(app)
            .post("/user/event-registration")
            .send(registration);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "User registration is successful" }); 
    });

    test("should register user for an event successfully", async () => {
        const registration = { userId: 1, eventId: 1 };

        (Registration.findOne as jest.Mock).mockResolvedValue(null); 
        (Registration.create as jest.Mock).mockResolvedValue({
            ...registration,
            Date: Date.now(),
            status: "registered",
        });

        const response = await request(app)
            .post("/user/event-registration")
            .send(registration);


        expect(Registration.findOne).toHaveBeenCalledWith({
            where: { userId: 1, eventId: 1 },
        });

        expect(Registration.create).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 1,
                eventId: 1,
                status: "registered",
            })
        );

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "User registration is successful" }); 
    });

    test("should return 409 if the user is already registered", async () => {
        const registration = { userId: 1, eventId: 1 };

        (Registration.findOne as jest.Mock).mockResolvedValue(registration);

        const response = await request(app)
            .post("/user/event-registration")
            .send(registration);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
            message: "User is already registered for this event",
        });

        expect(Registration.findOne).toHaveBeenCalledWith({
            where: { userId: 1, eventId: 1 },
        });

        expect(Registration.create).not.toHaveBeenCalled();
    });

    test("should return 500 on server error", async () => {
        const registration = { userId: 1, eventId: 1 };
        (Registration.findOne as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await request(app)
            .post("/user/event-registration")
            .send(registration);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            message: "Error while registering for an event",
        });
    });
});
