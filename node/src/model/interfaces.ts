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

//
export interface IImageView {
    name: string;
    content?: string;
    type: string; // Binary or Url
    extension: string;
}

export function isImageView(elem: any): elem is IImageView {
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.content !== undefined && typeof elem.content !== 'string') {
        return false;
    }
    if (elem.type === undefined || typeof elem.type !== 'string') {
        return false;
    }
    if (elem.extension === undefined || typeof elem.extension !== 'string') {
        return false;
    }

    return true;
}

//
export interface IExtraIngredientView {
    id: number;
    name: string;
    price: number;
    selected: boolean;
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

export function isReservationView(elem: any): elem is IReservationView {
    if (elem.date === undefined || typeof elem.date !== 'string') {
        return false;
    }
    if (elem.type === undefined || (!isReservationType(elem.type))) {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.email === undefined || typeof elem.email !== 'string') {
        return false;
    }
    if (elem.assistants === undefined || typeof elem.assistants !== 'number') {
        return false;
    }
    if (elem.guestList === undefined || !(elem.guestList instanceof Array) ||
        elem.guestList.map((e: any) => {
            return typeof e !== 'string';
        }).reduce((elem1: any, elem2: any) => {
            return elem1 || elem2;
        })) {
        return false;
    }
    return true;
}

//
export interface IReservationType {
    name: string;
}

export function isReservationType(elem: any): elem is IReservationType {
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    return true;
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

export function isFavouriteView(elem: any): elem is IFavouriteView {
    if (elem.isFav === undefined || typeof elem.isFav !== 'boolean') {
        return false;
    }
    if (elem.likes === undefined || typeof elem.likes !== 'number') {
        return false;
    }
    return true;
}
