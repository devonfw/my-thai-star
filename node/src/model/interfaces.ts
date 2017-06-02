import {Request} from 'express';
import { TableCron } from '../utils/tableManagement';
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
    if (elem.categories === undefined || !(elem.categories instanceof Array)){
        return false;
    }
    if (elem.maxPrice !== undefined && elem.maxPrice !== null && elem.maxPrice !== '' && typeof elem.maxPrice !== 'number'){
        return false;
    }
    if (elem.minLikes !== undefined && elem.minLikes !== null && elem.minLikes !== '' && typeof elem.minLikes !== 'number'){
        return false;
    }
    if (elem.searchBy !== undefined && elem.searchBy !== null && typeof elem.searchBy !== 'string'){
        return false;
    }
    if (elem.showOrder !== undefined && elem.showOrder !== null && typeof elem.showOrder !== 'number'){
        return false;
    }
    if (elem.isFab !== undefined && elem.isFab !== null && typeof elem.isFab !== 'boolean'){
        return false;
    }
    if (elem.sort !== undefined && !(elem.sort instanceof Array) && elem.sort !== null &&
         elem.sort.map((e: any) => !isSortByView(e)).reduce((elem1: any, elem2: any) => elem1 || elem2)) {
        return false;
    }

    return true;
}

export interface SortByView {
    name: string | null;
    direction: string;
}

export function isSortByView(elem: any): elem is SortByView {
    if (elem.name === undefined || (typeof elem.name !== 'string' && elem.name !== null)){
        return false;
    }
    if (elem.direction === undefined || typeof elem.direction !== 'string'){
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
    if (elem.size === undefined || typeof elem.size !== 'number'){
        return false;
    }
    if (elem.page === undefined || typeof elem.page !== 'number'){
        return false;
    }
    if (elem.total === undefined || typeof elem.total !== 'number'){
        return false;
    }
    return true;
}

export interface PaginatedList {
    pagination: Paginated;
    // TODO: fix this types
    result: DishesView[] | OrderView[];
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
    if (elem.dish === undefined || !isDishView(elem.dish)) {
        return false;
    }
    if (elem.image === undefined || !isImageView(elem.image)) {
        return false;
    }
    if (elem.extras === undefined || !(elem.extras instanceof Array) ||
        elem.extras.map((e: any) => !isExtraIngredientView(e)).reduce((elem1: any, elem2: any) =>
        elem1 || elem2)) {
        return false;
    }

    return true;
}

export interface DishView {
    id: number;
    name: string;
    description: string;
    price: number;
    imageId?: number;
}

export function isDishView(elem: any): elem is DishView {
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
    if (elem.imageId !== undefined && typeof elem.imageId !== 'number') {
        return false;
    }

    return true;
}

export interface ImageView {
    name: string;
    content?: string;
    contentType: string; // Binary or Url
    mimeType: string;
}

export function isImageView(elem: any): elem is ImageView {
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.content !== undefined && typeof elem.content !== 'string') {
        return false;
    }
    if (elem.contentType === undefined || typeof elem.contentType !== 'string') {
        return false;
    }
    if (elem.mimeType === undefined || typeof elem.mimeType !== 'string') {
        return false;
    }

    return true;
}

export interface ExtraIngredientView {
    id: number;
    name: string;
    description: string;
    price: number;
}

export function isExtraIngredientView(elem: any): elem is ExtraIngredientView {
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

    return true;
}

export interface FavouriteView {
    isFav: boolean;
    likes: number;
}

export function isFavouriteView(elem: any): elem is FavouriteView {
    if (elem.isFav === undefined || typeof elem.isFav !== 'boolean') {
        return false;
    }
    if (elem.likes === undefined || typeof elem.likes !== 'number') {
        return false;
    }
    return true;
}

export interface BookingPostView {
    booking: BookingEntity;
    invitedGuests?: InvitedGuestEntity[];
}

export function isBookingPostView(elem: any): elem is BookingPostView {
    if (elem.booking === undefined || !isBookingEntity(elem.booking)){
        return false;
    }
    if (elem.invitedGuests !== undefined && (!(elem.invitedGuests instanceof Array) ||
        elem.invitedGuests.map((e: any) => !isInvitedGuestEntity(e)).reduce((elem1: any, elem2: any) =>
        elem1 || elem2))) {
        return false;
    }
    return true;
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

export enum BookingTypes {booking = 0, invited}

// TODO
// export function isBookingView(elem: any): elem is IBookingView {
//     if (elem.date === undefined || typeof elem.date !== 'string') {
//         return false;
//     }
//     if (elem.type === undefined || (!isBookingType(elem.type))) {
//         return false;
//     }
//     if (elem.name === undefined || typeof elem.name !== 'string') {
//         return false;
//     }
//     if (elem.email === undefined || typeof elem.email !== 'string') {
//         return false;
//     }
//     if (elem.type.index === BookingTypes.booking && (elem.assistants === undefined || typeof elem.assistants !== 'number')) {
//         return false;
//     }
//     if (elem.type.index === BookingTypes.invited && (elem.guestList === undefined || !(elem.guestList instanceof Array) ||
//         (elem.guestList.length > 0 && elem.guestList.map((e: any) => {
//             return typeof e !== 'string';
//         }).reduce((elem1: any, elem2: any) => {
//             return elem1 || elem2;
//         })))) {
//         return false;
//     }
//     return true;
// }

export interface OrderView {
    order: OrderEntity;
    booking: BookingEntity;
    invitedGuest: InvitedGuestEntity;
    orderLines: OrderLinesView[];
}

// TODO
// export function isOrderView(elem: any): elem is IOrderView {
//     if (elem.lines === undefined || !(elem.lines instanceof Array) ||
//         elem.lines.length === 0 || (elem.lines.length > 0 && elem.lines.map((e: any) => {
//             return !isOrderLineView(e);
//         }).reduce((elem1: any, elem2: any) => {
//             return elem1 || elem2;
//         }))) {
//         return false;
//     }
//     if (elem.bookingId === undefined || typeof elem.bookingId !== 'string') {
//         return false;
//     }
//     return true;
// }

export interface OrderPostView {
    orderLines: OrderLinesView[];
    booking: { bookingToken: string; };
}

export function isOrderPostView(elem: any): elem is OrderPostView {
    if (elem.booking === undefined || elem.booking.bookingToken === undefined || typeof elem.booking.bookingToken !== 'string'){
        return false;
    }

    return true;
}

export interface OrderLinesView {
    orderLine: OrderLineView;
    dish: DishView;
    extras: ExtraIngredientView[];
}

export interface OrderLineView {
    id?: number;
    dishId: number;
    amount: number;
    comment?: string;
    orderId: number;
}

// TODO
// export function isOrderLineView(elem: any): elem is IOrderLineView {
//     if (elem.idDish === undefined || typeof elem.idDish !== 'number') {
//         return false;
//     }
//     if (elem.extras === undefined || !(elem.extras instanceof Array) ||
//         (elem.extras.length > 0 && elem.extras.map((e: any) => {
//             return typeof e !== 'number';
//         }).reduce((elem1: any, elem2: any) => {
//             return elem1 || elem2;
//         }))) {
//         return false;
//     }
//     if (elem.amount === undefined || typeof elem.amount !== 'number') {
//         return false;
//     }
//     if (elem.comment !== undefined && typeof elem.comment !== 'string') {
//         return false;
//     }
//     return true;
// }

export interface OrderFilterView {
    bookingId?: number;
    invitedGuest?: number;
}

export function isOrderFilterView(elem: any): elem is OrderFilterView {
    if (elem.bookingId !== undefined && typeof elem.bookingId !== 'number'){
        return false;
    }
    if (elem.invitedGuest !== undefined && typeof elem.invitedGuest !== 'number'){
        return false;
    }
    return true;
}

export interface BookingEntity {
    id?: number;
    name: string;
    bookingToken?: string;
    comment?: string;
    bookingDate: string;
    expirationDate?: string;
    creationDate?: string;
    email: string;
    canceled?: boolean;
    bookingType: number;
    tableId?: number;
    orderId?: number;
    assistants?: number;
}

export function isBookingEntity(elem: any): elem is BookingEntity {
    if (elem.id !== undefined && typeof elem.id !== 'number') {
        return false;
    }
    if (elem.name === undefined || typeof elem.name !== 'string') {
        return false;
    }
    if (elem.comment !== undefined && typeof elem.comment !== 'string') {
        return false;
    }
    if (elem.bookingDate === undefined || typeof elem.bookingDate !== 'string') {
        return false;
    }
    if (elem.expirationDate !== undefined && typeof elem.expirationDate !== 'string') {
        return false;
    }
    if (elem.creationDate !== undefined && typeof elem.creationDate !== 'string') {
        return false;
    }
    if (elem.email === undefined || typeof elem.email !== 'string') {
        return false;
    }
    if (elem.canceled !== undefined && typeof elem.canceled !== 'boolean') {
        return false;
    }
    if (elem.bookingType === undefined || typeof elem.bookingType !== 'number') {
        return false;
    }
    if (elem.tableId !== undefined && typeof elem.tableId !== 'number') {
        return false;
    }
    if (elem.orderId !== undefined && typeof elem.orderId !== 'number') {
        return false;
    }
    if (elem.assistants !== undefined && typeof elem.assistants !== 'number') {
        return false;
    }
    return true;
}

export interface OrderEntity {
    id: number;
    bookingId: number;
    invitedGuestId: number;
    bookingToken: string;
}

export function isOrderEntity(elem: any): elem is OrderEntity {
    if (elem.id === undefined || typeof elem.id !== 'number') {
        return false;
    }
    if (elem.bookingId === undefined || typeof elem.bookingId !== 'number') {
        return false;
    }
    if (elem.invitedGuestId === undefined || typeof elem.invitedGuestId !== 'number') {
        return false;
    }
    if (elem.bookingToken === undefined || typeof elem.bookingToken !== 'string') {
        return false;
    }
    return true;
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
    if (elem.id !== undefined && typeof elem.id !== 'number') {
        return false;
    }
    if (elem.bookingId !== undefined && typeof elem.bookingId !== 'number') {
        return false;
    }
    if (elem.guestToken !== undefined && typeof elem.guestToken !== 'string') {
        return false;
    }
    if (elem.email === undefined || typeof elem.email !== 'string') {
        return false;
    }
    if (elem.acepted !== undefined && typeof elem.acepted !== 'boolean') {
        return false;
    }
    if (elem.modificationDate !== undefined && typeof elem.modificationDate !== 'string') {
        return false;
    }
    return true;
}

export interface Error {
    code: number;
    message: string;
}

export interface CustomRequest extends Request {
    tableCron: TableCron;
    user?: User;
}