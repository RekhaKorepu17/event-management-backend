export type event = {
  id: number;
  name: string;
  description: string;
  Date: Date;
  startTime: Date;
  endTime: Date;
  address: string;
  eventType: string;
  imageUrl: string;
  organizerName: string;
  organizerContact: string;
  eventStatus: "active" | "completed" | "cancelled";
};
