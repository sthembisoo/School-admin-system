/* eslint-disable @typescript-eslint/naming-convention */
export interface Product {
    Id?:  string;
    Name: string;
    Type: Product_type;
    Status: boolean;
    Product_Image?: string;
    Quantity: number;
   Cost: number;
};

export interface Product_type {
    id: string;
    name: string;
    description?: string;
};
