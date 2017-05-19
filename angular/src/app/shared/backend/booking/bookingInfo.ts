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
    name: string;
    price: number;
    selected: boolean;
}
