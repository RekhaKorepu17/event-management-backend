import { Event as eventType } from "../types/event";
export class Event {
  name: string;
  description: string;
  eventDate: Date;
  startTime: Date;
  endTime: Date;
  address: string;
  eventType: string;
  eventStatus: string;
  organizerName: string;
  organizerContact: string;
  imageUrl: string;

  constructor(event: eventType) {
    this.name = event.name;
    this.description = event.description;
    this.eventDate = new Date(event.eventDate),
    this.startTime = new Date(event.startTime),
    this.endTime = new Date(event.endTime);
    this.address = event.address;
    this.eventType = event.eventType;
    this.eventStatus = event.eventStatus;
    this.organizerName = event.organizerName;
    this.organizerContact = event.organizerContact;
    this.imageUrl = event.imageUrl;
  }
}
