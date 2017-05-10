//
export interface IDishView {
    id: number;
    name: string;
    description: string;
    price: number;
    image: IImageView;
    extras: IExtraIngredientView[];
    favourite: IFavouriteView;
}

//
export interface IImageView {
    name: string;
    content: string;
    type: string; // Binary or Url
    extension: string;
}

//
export interface IExtraIngredientView {
    id: number;
    name: string;
    price: number;
    selected: boolean;
}

/*
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
}*/

export interface IError {
    code: number;
    message: string;
}

//
export interface IReservationView {
    date: string;
    type: IReservationType;
    name: string;
    email: string;
    assistants: number;
    guestList: string[];
}

//
export interface IReservationType {
    name: string;
}

//
export interface IOrderView {
    lines: IOrderLineView[];
    invitationId: string;
}

//
export interface IOrderLineView {
    idDish: number;
    extras: number[];
    amount: number;
    comment: string;
}

//
export interface IFilterView {
    categories: ICategoryView[];
    maxPrice: number;
    minLikes: number;
    searchBy: string;
    showOrder: number;
    isFab: boolean;
}

//
export interface ICategoryView {
    id: number;
    name: string;
    description: string;
    group: number;
    selected: boolean;
    showOrder: number;
}

//
export interface IFavouriteView {
    isFav: boolean;
    likes: number;
}
