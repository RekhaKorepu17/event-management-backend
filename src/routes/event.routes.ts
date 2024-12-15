import express from "express";
const eventRoutes = express.Router();
import { postEvent } from "../controllers/events/postEvent";
import { getAllEvents } from "../controllers/events/event";

eventRoutes.post("/event", postEvent);

eventRoutes.get("/events", getAllEvents);

export default eventRoutes;
