/* eslint-disable @typescript-eslint/naming-convention */
export interface Emergency_Contact {
    Emergency_Con_ID?: number;
    Pupil_ID?: number;
    Name: string;
    Surname: string;
    Contact_Number: string;
    Physical_Address: string;
    Relationship_To_Pupil: string;
    Career: string;
};


export interface Allergy {
    Allergy_ID?: number;
    Pupil_ID?: number;

    Allergy_Description: string;
    Treatment: string;
};


export interface Medical_Condition {
    Medical_Con_ID?: number;
    Pupil_ID?: number;

    Condition_Description: string;
    Treatment: string;
};
