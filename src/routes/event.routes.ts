import express from "express";
const eventRoutes = express.Router();
import { postEvent } from "../controllers/events/postEvent";
import { fetchEvents } from "../controllers/events/event";

eventRoutes.post("/event", postEvent);

eventRoutes.get("/events", fetchEvents);

export default eventRoutes;
