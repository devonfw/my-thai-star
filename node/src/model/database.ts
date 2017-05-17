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
    type: string;
    extension: string;
}

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
    comment: string;
}

export interface IOrder {
    id: string;
    lines: IOrderLine[];
    // canceled: boolean;
    idReservation: string;
    idInvitation?: string;

}

export interface IReservation {
    id: string;
    userId?: string;
    name: string;
    email: string;
    reservationToken: string;
    // comments: string | null;
    bookingDate: string;
    expirationDate: string;
    creationDate: string;
    canceled: boolean;
    reservationType: string;
    assistants?: number | null;
    guestList?: string[] | null;
    order?: string | null;
    table?: string | null;
}

export interface ITable {
    id: string;
    seatsNumber: number;
}

export interface IInvitationGuest {
    id: string;
    idReservation: string;
    guestToken: string;
    email: string;
    accepted: boolean | null;
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
