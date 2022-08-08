import { EventType } from "./eventType";
import { Schedule } from "./schedule";


export interface Event {
    id?: string;
    eventID?: number;
    Event_Type_ID: number;
    Schedule_ID?: number;
    Description: string;
    Location: string;
    Date: string;
    Time: string;
    Event_Cost: number;
    EventType?: EventType;
    // eventIncome?: EventIncome[];
    schedule?: Schedule;
}
