export interface IFilterView {
    categories: ICategoryView[];
    maxPrice: number;
    minLikes: number;
    searchBy: string;
    showOrder: number;
    isFab: boolean;
    sortBy: ISortByView[];
}

export interface ISortByView {
    name: string;
    direction: string;
}

export interface ICategoryView {
    id: number;
    name: string;
    description: string;
    selected: boolean;
    showOrder: number;
}

export interface IDishView {
    id: number;
    name: string;
    description: string;
    price: number;
    image: IImageView;
    extras: IExtraIngredientView[];
    favourite: IFavouriteView;
}

export function isDishView(elem: any): elem is IDishView {
    if (elem.id === undefined || typeof elem.id !== 'number') {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.description === undefined || typeof elem.description !== 'string') {
        return false;
    }
    if (elem.price === undefined || typeof elem.price !== 'number') {
        return false;
    }
    if (elem.image === undefined || !isImageView(elem.image)) {
        return false;
    }
    if (elem.extras === undefined || !(elem.extras instanceof Array) ||
        elem.extras.map((e: any) => {
            !isExtraIngredientView(e);
        }).reduce((elem1: any, elem2: any) => {
            return elem1 || elem2;
        })) {
        return false;
    }
    if (elem.favourite === undefined || !isFavouriteView(elem.favourite)) {
        return false;
    }

    return true;
}

export interface IImageView {
    name: string;
    content?: string;
    contentType: number; // Binary or Url
    mimeType: string;
}

export function isImageView(elem: any): elem is IImageView {
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.content !== undefined && typeof elem.content !== 'string') {
        return false;
    }
    if (elem.contentType === undefined || typeof elem.contentType !== 'number') {
        return false;
    }
    if (elem.mimeType === undefined || typeof elem.mimeType !== 'string') {
        return false;
    }

    return true;
}

export interface IExtraIngredientView {
    id: number;
    name: string;
    selected: boolean;
    price: number;
}

export function isExtraIngredientView(elem: any): elem is IExtraIngredientView {
    if (elem.id === undefined || typeof elem.id !== 'number') {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.price === undefined || typeof elem.price !== 'number') {
        return false;
    }
    if (elem.selected === undefined || typeof elem.selected !== 'boolean') {
        return false;
    }

    return true;
}

export interface IFavouriteView {
    isFav: boolean;
    likes: number;
}

export function isFavouriteView(elem: any): elem is IFavouriteView {
    if (elem.isFav === undefined || typeof elem.isFav !== 'boolean') {
        return false;
    }
    if (elem.likes === undefined || typeof elem.likes !== 'number') {
        return false;
    }
    return true;
}

export interface IBookingView {
    date: string;
    type: IBookingType;
    name: string;
    email: string;
    assistants?: number;
    guestList?: string[];
}

export enum BookingTypes {booking = 0, invited}

export function isBookingView(elem: any): elem is IBookingView {
    if (elem.date === undefined || typeof elem.date !== 'string') {
        return false;
    }
    if (elem.type === undefined || (!isBookingType(elem.type))) {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.email === undefined || typeof elem.email !== 'string') {
        return false;
    }
    if (elem.type.index === BookingTypes.booking && (elem.assistants === undefined || typeof elem.assistants !== 'number')) {
        return false;
    }
    if (elem.type.index === BookingTypes.invited && (elem.guestList === undefined || !(elem.guestList instanceof Array) ||
        (elem.guestList.length > 0 && elem.guestList.map((e: any) => {
            return typeof e !== 'string';
        }).reduce((elem1: any, elem2: any) => {
            return elem1 || elem2;
        })))) {
        return false;
    }
    return true;
}

export interface IBookingType {
    index: number;
}

export function isBookingType(elem: any): elem is IBookingType {
    if (elem.index === undefined || typeof elem.index !== 'number') {
        return false;
    }
    return true;
}

export interface IOrderView {
    lines: IOrderLineView[];
    bookingId: string;
}

export function isOrderView(elem: any): elem is IOrderView {
    if (elem.lines === undefined || !(elem.lines instanceof Array) ||
        elem.lines.length === 0 || (elem.lines.length > 0 && elem.lines.map((e: any) => {
            return !isOrderLineView(e);
        }).reduce((elem1: any, elem2: any) => {
            return elem1 || elem2;
        }))) {
        return false;
    }
    if (elem.bookingId === undefined || typeof elem.bookingId !== 'string') {
        return false;
    }
    return true;
}

export interface IOrderLineView {
    idDish: number;
    extras: number[];
    amount: number;
    comment?: string;
}

export function isOrderLineView(elem: any): elem is IOrderLineView {
    if (elem.idDish === undefined || typeof elem.idDish !== 'number') {
        return false;
    }
    if (elem.extras === undefined || !(elem.extras instanceof Array) ||
        (elem.extras.length > 0 && elem.extras.map((e: any) => {
            return typeof e !== 'number';
        }).reduce((elem1: any, elem2: any) => {
            return elem1 || elem2;
        }))) {
        return false;
    }
    if (elem.amount === undefined || typeof elem.amount !== 'number') {
        return false;
    }
    if (elem.comment !== undefined && typeof elem.comment !== 'string') {
        return false;
    }
    return true;
}

export interface IError {
    code: number;
    message: string;
}
