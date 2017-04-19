export interface OrderView {
    dishes: Array<DishView>;
}

export interface DishView {
    orderName: string;
    orderDescription: string;
    price: number;
    image: string;
    options: Array<ExtraView>
    likes: number;
    favourite: boolean;
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
    event: Event;
    email: string;
    adults: number;
    kids: number;
    invitationNumber: number;
}

export interface InvitationView {
    event: Event;
    nameOwner: string;
    emailOwner: string;
    friends: Array<string>;
    invitationNumber: number;
}

export interface Event {
    name: string;
    date: string;
    hour: string;
}
