import express from "express";
const eventRegistrationRoutes = express.Router();
import { registerForEvent } from "../controllers/registrations/registerForEvent";

eventRegistrationRoutes.post('/user/event-registration', registerForEvent);

export default eventRegistrationRoutes ;
