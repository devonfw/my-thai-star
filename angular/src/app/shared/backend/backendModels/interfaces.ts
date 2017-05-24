// FILTERS
export class Filter {
    isFav: boolean;
    searchBy: string;
    sortBy: { name: string, dir: string };
    maxPrice: number;
    minLikes: number;
    categories: [{ id: string }];
}

// DISHES
export class Dish {
    id: number;
    isfav: boolean;
    image: string;
    likes: number;
    extras: {id: number, name: string, price: number, selected: boolean}[];
    description: string;
    name: string;
    price: number;
    categories: [{id: string}];
}

export class ExtraInfo {
    id: number;
    name: string;
    price: number;
    selected: boolean;
}

// BOOKING
export class BookingInfo {
    date: string;
    name: string;
    email: string;
    bookingType: number;
    assistants: number;
    orders: OrderInfo[];
    guestList: string[];
}

export class FriendsInvite {
    email: string;
    acceptance: string;
}

export class OrderInfo {
    idDish: number;
    extras: number[];
    amount: number;
    comment: string;
}

export class OrderListInfo {
    bookingId: number;
    orders: OrderInfo[];
}

// LOGIN
export class LoginInfo {
    username: string;
    password: string;
    role: string;
}

export class Role {
    name: string;
    permission: number;
}
