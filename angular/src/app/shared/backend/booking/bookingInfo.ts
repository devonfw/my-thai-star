export class BookingInfo {
    date: string;
    hour: string;
    creationDate: string;
    creationHour: string;
    nameOwner: string;
    emailOwner: string;
    reservationId: number;
    adults?: number;
    kids?: number;
    orders?: OrderInfo[];
    friends?: FriendsInvite[];
}

export class FriendsInvite {
    email: string;
    acceptance: string;
}

export class OrderInfo {
    orderName: string;
    price: number;
    options: ExtraInfo[];
    number: number;
    comment: string;
}

export class ExtraInfo {
    name: string;
    price: number;
    selected: boolean;
}
