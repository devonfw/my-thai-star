/*
export interface DishView {
    orderName: string;
    orderDescription: string;
    price: number;
    image: string;
    options: Array<ExtraView>
    likes: number;
    favourite: boolean;
}*/

export interface IDishView {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    extras: IExtraView[];
    favourite: IFavouriteView;
    tweet: ITweetView[];
}

interface IImageView {
    name: string;
    content: string;
    type: IImageType;
    extension: string;
}

enum IImageType { BINARY, URL }

export interface IExtraView {
    id: number;
    name: string;
    price: number;
    selected: boolean;
}

export interface IReservationView {
    event: IEvent;
    email: string;
    adults: number;
    kids: number;
    invitationNumber: number;
}

export interface IInvitationView {
    event: IEvent;
    nameOwner: string;
    emailOwner: string;
    friends: string[];
    invitationNumber: number;
}

export interface IEvent {
    name: string;
    date: string;
    hour: string;
}

export interface IError {
    code: number;
    message: string;
}

export interface IReservation {
    date: string;
    type: IReservationType;
    name: string;
    email: string;
    assistants: number;
    guestList: string[];
}

export interface IReservationType {
    name: string;
    value: number;
}

export interface IOrderView {
    lines: IOrderLineView[];
    invitation: string;
}

export interface IOrderLineView {
    dish: IDishView;
    extras: IExtraView[];
    amount: number;
    comment: string;
}

export interface IFilterView {
    categories: ICategoryView[];
    maxPrice: number;
    minLikes: number;
    searchBy: string;
    order: number;
    isFab: boolean;
}

export interface ICategoryView {
    id: number;
    name: string;
    description: string;
    group: number;
    selected: boolean;
    order: number;
}

export interface IFavouriteView {
    isFav: boolean;
    likes: number;
}

enum ImageType { Binary = 0, Url }

export interface ITweetView {
    prueba: string;
}
