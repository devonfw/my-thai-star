// FILTERS
export class Filter {
    isFav: boolean;
    searchBy: string;
    sort: { name: string, direction: string }[];
    maxPrice: number;
    minLikes: number;
    categories: [{ id: string }];
}

export class FilterCockpit {
    date: string;
    email: string;
    bookingId: number;
}

// DISHES
export class ExtraInfo {
    id: number;
    name: string;
    price: number;
    selected: boolean;
}

// BOOKING
export class BookingInfo {
    bookingDate: string;
    name: string;
    email: string;
    bookingType: number;
    assistants?: number;
    invitedGuests?: [{email: string}];
}

export class FriendsInvite {
    email: string;
    acceptance: string;
}

export class OrderInfo {
    orderLine: OrderLineInfo;
    extras: number[];
}

export class OrderLineInfo {
    idDish: number;
    amount: number;
    comment: string;
}

export class OrderListInfo {
    booking: {bookingToken: string};
    orderLines: OrderInfo[];
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
