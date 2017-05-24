export interface IDish {
    id: string;
    name: string;
    description: string;
    price: number;
    image: IImage;
    extras: string[];
}

export interface IImage {
    name: string;
    content?: string;
    contentType: number;
    mimeType: string;
}

export enum ContentTypes {url = 0, binary}

export interface IIngredient {
    id: string;
    name: string;
    price: number;
    description: string;
}

export interface IDishCategory {
    id: string;
    idDish: string;
    idCategory: string;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    group: number;
    showOrder: number;
}

export interface IOrderLine {
    idDish: string;
    extras: string[];
    amount: number;
    comment?: string;
}

export interface IOrder {
    id: string;
    lines: IOrderLine[];
    // canceled: boolean;
    idBooking: string;
    idInvitedGuest?: string;
}

export interface IBooking {
    id: string;
    userId?: string;
    name: string;
    email: string;
    bookingToken: string;
    // comments: string | null;
    bookingDate: string;
    expirationDate: string;
    creationDate: string;
    canceled: boolean;
    bookingType: number;
    assistants?: number;
    guestList?: string[];
    order?: string;
    table?: string;
}

export interface ITable {
    id: string;
    seatsNumber: number;
}

export interface IInvitedGuest {
    id: string;
    idBooking: string;
    guestToken: string;
    email: string;
    acepted?: boolean;
    modificationDate: string;
    order?: string;
}

export interface IUser {
    id: string;
    userName: string;
    password: string;
    email: string;
    role: string;
    favourites: string[];
}
