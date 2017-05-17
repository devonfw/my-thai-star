export interface DishView {
    orderName: string;
    orderDescription: string;
    price: number;
    image: string;
    options: ExtraView[];
    likes: number;
    favourite: boolean;
}

export interface OrderView {
    orderName: string;
    price: number;
    options: ExtraView[];
    number: number;
    comment: string;
}

interface ImageView {
    name: string;
    content: string;
    type: ImageType;
    extension: string;
}

enum ImageType { BINARY, URL }

export interface ExtraView {
    name: string;
    price: number;
    selected: boolean;
}

export interface ReservationView {
    date: string;
    hour: string;
    creationDate: string;
    creationHour: string;
    nameOwner: string;
    emailOwner: string;
    reservationId: number;
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
    sortBy: string;
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
