import { Request, Response } from "express";
import Event from "../../models/event";
import { Event as EventClass } from "../../services/Event";

export const postEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { event } = req.body;
    const existingEvent: any = await Event.findOne({
      where: {
        name: event.name,
        organizerName: event.organizerName,
        eventDate: new Date(event.eventDate),
      },
    });

    if (existingEvent) {
      return res.status(409).json({ message: "Event already created" });
    }
    const formattedEvent = {
      ...event,
      eventDate: new Date(event.eventDate),
      startTime: new Date(`${event.eventDate}T${event.startTime}:00`),
      endTime: new Date(`${event.eventDate}T${event.endTime}:00`),
    };
    const newEvent: any = new EventClass(formattedEvent);

    const createdEvent = await Event.create(newEvent);
    console.log('res', createdEvent);
    return res.status(201).json({ message: "Event created" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
};
