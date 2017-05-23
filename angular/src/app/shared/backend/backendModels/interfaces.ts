export class OrderList {
    bookingId: number;
    orders: OrderInfo[];
}

export class BookingInfo {
    dateTime: string;
    creationDateTime?: string;
    nameOwner: string;
    emailOwner: string;
    bookingId?: number;
    tableId?: number;
    assitants?: number;
    kids?: number;
    orders?: OrderInfo[];
    friends?: FriendsInvite[];
}

export class FriendsInvite {
    email: string;
    acceptance: string;
}

export class OrderInfo {
    name: string;
    price: number;
    extras: ExtraInfo[];
    amount: number;
    comment: string;
}

export class ExtraInfo {
    id: number;
    name: string;
    price: number;
    selected?: boolean;
}

export class OrderInfo2Convert {
    idPlate: number;
    extras: [{id: number}];
    amount: number;
    comment: string;
}

export class Dish {
    isfav: boolean;
    image: string;
    likes: number;
    extras: {id: number, name: string, price: number, selected: boolean}[];
    description: string;
    name: string;
    price: number;
    categories: [{id: string}];
}

export class Filter {
    isFav: boolean;
    searchBy: string;
    sortBy: { name: string, dir: string };
    maxPrice: number;
    minLikes: number;
    categories: [{ id: string }];
}

export class LoginInfo {
    username: string;
    password: string;
    role: string;
}
