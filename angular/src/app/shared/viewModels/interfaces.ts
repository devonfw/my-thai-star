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
    booking: BookingView;
    invitedGuests?: FriendsInvite[];
}

export interface BookingView {
    bookingDate: string;
    name: string;
    email: string;
    assistants?: number;
    tableId?: number;
    bookingToken?: number;
    creationDate?: string;
}

export interface FriendsInvite {
    email: string;
    accepted: boolean;
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
    orderLines: OrderView[];
    booking: BookingView;
}
