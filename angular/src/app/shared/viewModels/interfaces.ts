export interface DishView {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    extras: ExtraView[];
    likes: number;
    isfav: boolean;
}

export interface OrderView {
    idDish: number;
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

export interface OrderListView {
    bookingId: number;
    orders: OrderView[];
}

export interface ReservationView {
    date: string;
    creationDate?: string;
    name: string;
    email: string;
    bookingId?: number;
    tableId?: number;
    bookingType: number;
    assistants: number;
    guestList?: FriendsInvite[];
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
