import { Request, Response } from "express"
import Event from "../../models/event";
export const fetchEvents= async(req: Request, res: Response): Promise<any> => {
    try{
    const events = await Event.findAll(); 
     return res.status(200).json({ message: "Events retrieved succesfully" , events: events});
    }
    catch(error: any){
     return res.status(500).json({ message: "Failed to fetch events",  error: error.message });
    }
}