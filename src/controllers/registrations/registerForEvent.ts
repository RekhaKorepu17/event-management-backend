import { Request, Response } from "express";
import Registration from "../../models/registration";

export const registerForEvent = async (req: Request, res: Response): Promise<any> => {
    try {
        const REGISTERED = "registered";
        const SUCCESS = "User registration is successful";
        const MISSING_FIELDS = "userId or eventId are missing.";

        const { userId, eventId } = req.body;
        if (!userId || !eventId) {
            return res.status(400).send({ message: MISSING_FIELDS });
        }
        const existingRegistration = await Registration.findOne({ where: {userId: userId, eventId: eventId }});
        if (existingRegistration) {
            return res.status(409).send({ message: "User is already registered for this event" });
        }
        const newRegistration = {
            userId,
            eventId,
            Date: Date.now(),
            status: REGISTERED,
        };

        await Registration.create(newRegistration);
        return res.status(201).send({ message: SUCCESS });
    } catch (error: any) {
        console.error("Error while registering for an event:", error);
        return res.status(500).send({ message: "Error while registering for an event" });
    }
};
