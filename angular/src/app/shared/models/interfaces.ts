export interface DishView {
    name: string;
    description: string;
    price: number;
    image: string;
    extras: ExtraView[];
    likes: number;
    isfav: boolean;
}

export interface OrderView {
    name: string;
    price: number;
    extras: ExtraView[];
    amount: number;
    comment: string;
}

export interface ExtraView {
    name: string;
    price: number;
    selected: boolean;
}

export interface OrderList {
    bookingId: number;
    orders: OrderView[];
}

export interface ReservationView {
    date: string;
    hour: string;
    creationDate: string;
    creationHour: string;
    nameOwner: string;
    emailOwner: string;
    bookingId: number;
    adults?: number;
    kids?: number;
    friends?: FriendsInvite[];
    orders?: OrderView[];
}

export interface FriendsInvite {
    email: string;
    acceptance: string;
}

export interface Filter {
    favourite: boolean;
    searchTerm: string;
    sortBy: {name: string, dir: string};
    price: number;
    likes: number;
    main: boolean;
    starter: boolean;
    dessert: boolean;
    noodle: boolean;
    rice: boolean;
    curry: boolean;
    vegan: boolean;
    vegetarian: boolean;
}
