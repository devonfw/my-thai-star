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
    id: number;
    name: string;
    price: number;
    selected?: boolean;
}

export interface OrderList {
    bookingId: number;
    orders: OrderView[];
}

export interface ReservationView {
    dateTime: string;
    creationDateTime?: string;
    nameOwner: string;
    emailOwner: string;
    bookingId?: number;
    tableId?: number;
    assitants?: number;
    friends?: FriendsInvite[];
    orders?: OrderView[];
}

export interface FriendsInvite {
    email: string;
    acceptance: string;
}

export interface Filter {
    searchBy: string;
    sortBy: {name: string, dir: string};
    maxPrice: number;
    minLikes: number;
    isFav: boolean;
    categories: CategoryView[];
}

export interface CategoryView {
    name: string;
    selected: boolean;
}
