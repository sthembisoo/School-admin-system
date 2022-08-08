import { Extra_Mural_Activity } from '@models/extraMuralActivity';

export interface ActivityType {
    activityTypeID: number;
    activityTypeDescription: string;
    activityDuration: number;
    extraMuralActivity: Extra_Mural_Activity[];
}
