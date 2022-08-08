import { Allergy, Emergency_Contact, Medical_Condition } from './EmergencyContact';
import { Parent } from '@models/parent';
import { Pupil } from '@models/pupil';


export interface PupilRegistration {
    pupil: Pupil;
    parent: Parent;
    emergencyContact: Emergency_Contact;
    allergy: Allergy;
    medicalCondition: Medical_Condition;
};
