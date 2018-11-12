import { TypeDefinition, checkType } from '../utils/utilFunctions';
import { User } from './database';

export interface FilterView {
    // pagination: {size: number; page: number; total: number};
    categories: CategoryView[];
    maxPrice?: number;
    minLikes?: number;
    searchBy?: string;
    showOrder?: number;
    isFab?: boolean;
    sort?: SortByView[];
}

export function isFilterView(elem: any): elem is FilterView {
    const type: TypeDefinition = {
        categories: ['required', 'array'],
        showOrder: ['optional', 'number'],
        isFab: ['optional', 'boolean'],
        sort: ['optional', 'array'],
    };

    return checkType(type, elem);
}

export interface SortByView {
    name: string | null;
    direction: string;
}

export function isSortByView(elem: any): elem is SortByView {
    if (elem.name === undefined || (typeof elem.name !== 'string' && elem.name !== null)) {
        return false;
    }
    if (elem.direction === undefined || typeof elem.direction !== 'string') {
        return false;
    }
    return true;
}

export interface Paginated {
    size: number;
    page: number;
    total: number;
}

export function isPaginated(elem: any): elem is Paginated {
    const type: TypeDefinition = {
        size: ['required', 'number'],
        page: ['required', 'number'],
        total: ['required', 'number'],
    };

    return checkType(type, elem);
}

export interface PaginatedList {
    pagination: Paginated;
    result: DishesView[] | OrderView[] | BookingEntity[] | BookingPostView[];
}

export interface CategoryView {
    id: number;
    name: string;
    description: string;
    selected: boolean;
    showOrder: number;
}

export interface DishesView {
    dish: DishView;
    image: ImageView;
    extras: ExtraIngredientView[];
}

export function isDishesView(elem: any): elem is DishesView {
    const type: TypeDefinition = {
        dish: ['required', isDishView],
        image: ['required', isImageView],
        extras: ['required', 'array'],
    };

    return checkType(type, elem);
}

export interface DishView {
    id: number;
    name: string;
    description: string;
    price: number;
    imageId?: number;
}

export function isDishView(elem: any): elem is DishView {
    const type: TypeDefinition = {
        id: ['required', 'number'],
        name: ['required', 'string'],
        description: ['required', 'string'],
        price: ['required', 'number'],
        imageId: ['optional', 'number'],
    };

    return checkType(type, elem);
}

export interface ImageView {
    name: string;
    content?: string;
    contentType: string; // Binary or Url
    mimeType: string;
}

export function isImageView(elem: any): elem is ImageView {
    const type: TypeDefinition = {
        name: ['required', 'string'],
        content: ['optional', 'string'],
        contentType: ['required', 'string'],
        mimeType: ['required', 'string'],
    };

    return checkType(type, elem);
}

export interface ExtraIngredientView {
    id: number;
    name?: string;
    description?: string;
    price?: number;
}

export function isExtraIngredientView(elem: any): elem is ExtraIngredientView {
    const type: TypeDefinition = {
        id: ['required', 'number'],
        name: ['required', 'string'],
        description: ['required', 'string'],
        price: ['required', 'number'],
    };

    return checkType(type, elem);
}

export interface FavouriteView {
    isFav: boolean;
    likes: number;
}

export function isFavouriteView(elem: any): elem is FavouriteView {
    const type: TypeDefinition = {
        isFav: ['required', 'boolean'],
        likes: ['required', 'number'],
    };

    return checkType(type, elem);
}

export interface BookingPostView {
    booking: BookingEntity;
    invitedGuests?: InvitedGuestEntity[];
}

export function isBookingPostView(elem: any): elem is BookingPostView {
    const type: TypeDefinition = {
        booking: ['required', isBookingEntity],
        invitedGuests: ['optional', 'array'],
    };

    return checkType(type, elem);
}

export interface BookingView {
    bookingDate: string;
    bookingToken: string;
    bookingType: number;
    name: string;
    email: string;
    assistants?: number;
    guestList?: string[];
}

export enum BookingTypes { booking = 0, invited }

export interface OrderView {
    order: OrderEntity;
    booking: BookingEntity;
    invitedGuest: InvitedGuestEntity;
    orderLines: OrderLinesView[];
}

export interface OrderPostView {
    orderLines: OrderLinesView[];
    booking: { bookingToken: string; };
}

export function isOrderPostView(elem: any): elem is OrderPostView {
    if (elem.booking === undefined || elem.booking.bookingToken === undefined || typeof elem.booking.bookingToken !== 'string') {
        return false;
    }

    return true;
}

export interface OrderLinesView {
    orderLine: OrderLineView;
    dish?: DishView;
    extras: ExtraIngredientView[];
}

export interface OrderLineView {
    id?: number;
    dishId: number;
    amount: number;
    comment?: string;
    orderId?: number;
}

export interface OrderFilterView {
    bookingId?: number;
    invitedGuest?: number;
}

export function isOrderFilterView(elem: any): elem is OrderFilterView {
    const type: TypeDefinition = {
        booking: ['optional', 'number'],
        invitedGuests: ['optional', 'number'],
    };

    return checkType(type, elem);
}

export interface BookingEntity {
    id?: number;
    name?: string;
    bookingToken?: string;
    comment?: string;
    bookingDate?: string;
    expirationDate?: string;
    creationDate?: string;
    email?: string;
    canceled?: boolean;
    bookingType?: number;
    tableId?: number;
    orderId?: number;
    assistants?: number;
}

export function isBookingEntity(elem: any): elem is BookingEntity {
    const type: TypeDefinition = {
        id: ['optional', 'number'],
        name: ['optional', 'string'],
        bookingToken: ['optional', 'string'],
        comment: ['optional', 'string'],
        bookingDate: ['optional', 'string'],
        expirationDate: ['optional', 'string'],
        creationDate: ['optional', 'string'],
        email: ['optional', 'string'],
        canceled: ['optional', 'boolean'],
        bookingType: ['optional', 'number'],
        tableId: ['optional', 'number'],
        orderId: ['optional', 'number'],
        assistants: ['optional', 'number'],
    };

    return checkType(type, elem);
}

export interface OrderEntity {
    id: number;
    bookingId: number;
    invitedGuestId: number;
    bookingToken: string;
}

export function isOrderEntity(elem: any): elem is OrderEntity {
    const type: TypeDefinition = {
        id: ['required', 'number'],
        bookingId: ['required', 'number'],
        invitedGuestId: ['required', 'number'],
        bookingToken: ['required', 'string'],
    };

    return checkType(type, elem);
}

export interface InvitedGuestEntity {
    id?: number;
    bookingId?: number;
    guestToken?: string;
    email: string;
    acepted?: boolean;
    modificationDate?: string;
}

export function isInvitedGuestEntity(elem: any): elem is InvitedGuestEntity {
    const type: TypeDefinition = {
        id: ['optional', 'number'],
        bookingId: ['optional', 'number'],
        guestToken: ['optional', 'string'],
        email: ['required', 'string'],
        acepted: ['optional', 'boolean'],
        modificationDate: ['optional', 'string'],
    };

    return checkType(type, elem);
}

export interface SearchCriteria {
    bookingToken?: string;
    email?: string;
    sort?: SortByView[];
    pagination: Paginated;
}

export function isSearchCriteria(elem: any): elem is SearchCriteria {
    const type: TypeDefinition = {
        pagination: ['required', isPaginated],
    };

    return checkType(type, elem);
}

export interface Error {
    code: number;
    message: string;
}

export interface EmailContent {
    emailFrom?: string;
    emailAndTokenTo?: { [index: string]: string; };
    emailType?: number;
    detailMenu?: string[];
    bookingDate?: string;
    assistants?: number;
    bookingToken?: string;
    price?: number;
    buttonActionList?: {
        [index: string]: string;
    };
    host?: {
        [index: string]: string;
    };
}