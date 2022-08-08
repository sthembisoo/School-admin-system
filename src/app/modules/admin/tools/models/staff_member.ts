/* eslint-disable @typescript-eslint/naming-convention */

export interface Staff_Member {
    id?: string;
    title__Type_ID?: number;
    staff_Type_ID: number;
    uid?: string;
    name: string;
    surname: string;
    contact_Number: string;
    email_Address: string;
    address_ID?: number;
    postal_Address?: string;
    employment_Date: string;
    qualification: string;
    classes?: Class[];
   // title_Type: string;
   RoleDescription?: string;
   userAuth?: any[];
    // user: User;
}


export interface Staff_Type {
    id?: string;
    staff_Type_ID: number;
    staff_Type_Description: string;
    staff_Member: Staff_Member[];
};



export interface Class {
    id?: string;
    class_ID: number;
    grade_ID: number;
    employee_ID: number;
    classroom_ID: number;
    staff_Member: Staff_Member;
    // classroom: Classroom;
    // grade: Grade;
    // pupil_Class: Pupil_Class[];
}
