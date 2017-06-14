export interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    image: Image;
    extras: string[];
}

export interface Image {
    name: string;
    content?: string;
    contentType: string;
    mimeType: string;
}

export enum ContentTypes {url = 0, binary}

export interface Ingredient {
    id: string;
    name: string;
    price: number;
    description: string;
}

export interface DishCategory {
    id: string;
    idDish: string;
    idCategory: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    group?: number;
    showOrder: number;
}

export interface OrderLine {
    idDish: string;
    extras: string[];
    amount: number;
    comment?: string;
}

export interface Order {
    id: string;
    lines: OrderLine[];
    // canceled: boolean;
    idBooking: string;
    idInvitedGuest?: string;
}

export interface Booking {
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

export interface Table {
    id: string;
    seatsNumber: number;
}

export interface InvitedGuest {
    id: string;
    idBooking: string;
    guestToken: string;
    email: string;
    accepted?: boolean;
    modificationDate: string;
    order?: string;
}

export interface UserRole {
    id: string;
    name: string;
    active: boolean;
}

export interface User {
    id: string;
    userName: string;
    password: string;
    email: string;
    role: string;
    favourites: string[];
}
