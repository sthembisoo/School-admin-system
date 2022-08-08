import { Event } from './event';
import { Extra_Mural_Activity } from './extraMuralActivity';

export interface Schedule {
    scheduleID: number;
    itemName: string;
    itemDescription: string;
    itemDate: string;
    itemStartTime: string;
    itemEndTime: string;
    events?: Event[];
    extraMuralActivity?: Extra_Mural_Activity[];
}
