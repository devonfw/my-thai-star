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
    dish: IDish;
    quantity: number;
    comment: string;
}

export interface IOrder {
    lines: IOrderLine[];
    canceled: boolean;

}

export interface IReservation {
    date: string;
    type: IReservationType;
    name: string;
    email: string;
    assistants: number;
    guestList: string[];
    order: IOrder;
    user: string;
    table: string;
}

export interface IReservationType {
    name: string;
    value: number;
}

export interface IInvitationGuest {
    id: string;
    idReservation: string;
    guestToken: string;
    email: string;
    accepted: boolean;
    modificationDate: string;
    order: IOrder;
}
