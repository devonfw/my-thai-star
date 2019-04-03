// DISHES
export interface DishView {
  dish: PlateView;
  image: { content: string };
  extras: ExtraView[];
  likes: number;
  isfav: boolean;
  categories?: { id: string }[];
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

export interface DishResponse {
  pageable: Pageable;
  content: DishView;
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
