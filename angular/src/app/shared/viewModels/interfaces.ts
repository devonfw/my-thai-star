// DISHES
export interface DishView {
    dish: PlateView;
    image: {content: string};
    extras: ExtraView[];
    likes: number;
    isfav: boolean;
    categories?: {id: string}[];
}

export interface PlateView {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ExtraView {
    id: number;
    name: string;
    price: number;
    selected?: boolean;
}

// BOOKING
export interface ReservationView {
    booking: {
        bookingDate: string;
        name: string;
        email: string;
        assistants: number;
        tableId?: number;
        bookingToken: number;
        creationDate: string;
    };
    invitedGuests?: FriendsInvite[];
}

export interface FriendsInvite {
    email: string;
    acceptance: string;
}

export interface OrderView {
    dish: {
        dishId: number;
        name: string;
        price: number;
    };
    orderLine: {
        amount: number;
        comment: string;
    };
    extras: ExtraView[];
}

export interface OrderListView {
    bookingToken: number;
    orderLines: OrderView[];
    booking: OrderBookingView;
}

export interface OrderBookingView {
    name: string;
    bookingDate: string;
    creationDate: string;
    email: string;
    tableId: number;
}
