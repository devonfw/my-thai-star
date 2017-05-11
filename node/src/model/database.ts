export interface IDish {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    extras: string[];
}

export interface IIngredient {
    id: string;
    name: string;
    price: number;
    description: string;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    group: number;
    showOrder: number;
    dishes: string[];
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
    canceled: boolean;
    idReservation: string;
    idInvitation: string;

}

export interface IReservation {
    id: string;
    userId: string;
    name: string;
    reservationToken: string;
    comments: string;
    bookingDate: string;
    expirationDate: string;
    creationDate: string;
    canceled: boolean;
    reservationType: string;
    assistants: number;
    guestList: string[];
    order: string;
    table: string;
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
    accepted: boolean;
    modificationDate: string;
    order: string;
}

export interface IUser {
    id: string;
    userName: string;
    password: string;
    email: string;
    role: string;
    favourites: string[];
}
