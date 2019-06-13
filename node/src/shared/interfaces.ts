import { BookingDTO } from 'management/booking/models/view-models/booking-vm';
import { ApiModelProperty } from '@nestjs/swagger';

// FILTERS

export class Filter {
  pageable?: Pageable;
  isFav: boolean;
  searchBy: string;
  maxPrice: number;
  minLikes: number;
  categories: { id: string }[];
}

export class CustomFilter {
  pageable?: Pageable;
}

export class CustomOrderFilter {
  bookingToken?: string;
  email?: string;
  pageable?: Pageable;
}

export class Pageable {
  pageSize: number;
  pageNumber: number;
  sort?: Sort[];
}

export class Sort {
  property: string;
  direction: string;
}

// DISHES
export class ExtraInfo {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

export interface DishView {
  dish: PlateView;
  image: { content: string };
  extras: ExtraView[];
  categories?: any[];
}

export interface PlateView {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ExtraView {
  id: number;
  name: string;
  price: number;
  selected?: boolean;
}

export interface Response<E> {
  pageable: Pageable;
  content: E[];
}

// export interface DishResponse {
//   pageable: Pageable;
//   content: DishView[];
// }

// BOOKING

export class BookingInfo {
  booking: ReservationInfo;
  invitedGuests?: {
    [index: number]: { email: string };
  };
}

export class ReservationInfo {
  bookingDate: string;
  name: string;
  email: string;
  bookingType: number;
  assistants?: number;
}

export class FriendsInvite {
  email: string;
  acceptance: string;
}

export class OrderInfo {
  orderLine: OrderLineInfo;
  extras: number[];
}

export class OrderLineInfo {
  dishId: number;
  amount: number;
  comment: string;
}

export class OrderListInfo {
  booking: { bookingToken: string };
  orderLines: OrderInfo[];
}

// export interface BookingResponse {
//   pagination: Pagination;
//   result: BookingView[];
// }

export class BookingView {
  booking: BookingDTO;
  invitedGuests: any[];
  order: any;
  orders: Array<any>;
  table: any;
  user: any;
}

// export class OrderResult {
//   pagination: Pagination;
//   result: OrderView[];
// }

export class OrderView {
  booking: any;
  host: any;
  invitedGuest: any;
  order: any;
  orderLines: any;
}
// LOGIN
export class LoginInfo {
  username: string;
  password: string;
  role: string;
  token?: string;
}

export class Role {
  name: string;
  permission: number;
}

// CANCEL

export class InvitationResponse {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  modificationCounter: number;
  @ApiModelProperty()
  accepted: boolean;
  @ApiModelProperty()
  guestToken: string;
  @ApiModelProperty()
  modificationDate: any;
  @ApiModelProperty()
  revision: any;
}
