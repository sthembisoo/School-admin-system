/* eslint-disable @typescript-eslint/naming-convention */
export interface Parent {
    Parent_ID?: number;
    Parent_Type_ID: number;
    Name: string;
    Surname: string;
    Contact_Number: string;
    Email_Address: string;
    Address: string;
    Career: string;
    Employer: string;
    Work_Contact_Number: string;
    Home_Contact_Number: string;
    ID_Number?: number;
    ID_Documentation?: string;

};

export interface Parent_Type {
    Parent_Type_ID: number;
    Parent_Type_Description: string;
};
