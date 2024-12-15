import { Request, Response } from "express";
import Event from "../../models/event";
import { Event as EventClass } from "../../services/Event";

export const postEvent = async (req: Request, res: Response): Promise<any>  => {
  try {
    const { event } = req.body;
    const existingEvent: any = await Event.findOne({
      where: {
        name: event.name,
        organizerName: event.organizerName,
        eventDate: event.eventDate,
      },
    });
    if (existingEvent) {
      return res.status(409).json({ message: "Event already created" });
    }
    const newEvent: any = new EventClass(event);
    Event.create(newEvent);
    return res.status(201).json({ message: "Event created" });
  } catch (error: any) {
    return res.status(500).json({
        message: "Failed to create event",
        error: error.message,
      });
  }
};
