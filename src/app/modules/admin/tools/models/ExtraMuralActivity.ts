/* eslint-disable @typescript-eslint/naming-convention */
import { Schedule } from './schedule';
import { Pupil } from './pupil';
import { ActivityType } from './ActivityType';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Extra_Mural_Activity {
    id?: string;
    Extra_Mural_Activity_ID?: string;
    Activity_Type_ID: number;
    Schedule_ID: number;
    Activity_Description: string;
    Activity_Location: string;
    Activity_Date: string;
    Activity_Time: string;
    // activity_Type: Activity_Type;
    // // schedule: Schedule;
    // // pupils: Pupil[];
};
