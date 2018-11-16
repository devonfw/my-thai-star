// FILTERS

export class Filter {
    pageable?: Pageable;
    isFav: boolean;
    searchBy: string;
    //sort: { name: string, direction: string }[];
    maxPrice: number;
    minLikes: number;
    categories: { id: string }[];
}

export class FilterCockpit {
    pageable?: Pageable;
    //sort?: Sorting[];
    bookingDate: string;
    email: string;
    bookingToken: number;
}

export class Pageable {
    pageSize: number;
    pageNumber: number;
    sort?: Array<Sort>;
}

export class Sort {
    property: string;
    direction: string;
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
    booking: ReservationInfo;
    invitedGuests?: {
        [index: number]: { email: string },
    };
}

export class ReservationInfo {
    bookingDate: string;
    name: string;
    email: string;
    bookingType: number;
    assistants?: number;
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
    dishId: number;
    amount: number;
    comment: string;
}

export class OrderListInfo {
    booking: { bookingToken: string };
    orderLines: OrderInfo[];
}

// LOGIN
export class LoginInfo {
    username: string;
    password: string;
    role: string;
    token?: string;
}

export class Role {
    name: string;
    permission: number;
}
