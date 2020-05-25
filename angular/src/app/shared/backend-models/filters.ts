// FILTERS

export class Filter {
  pageable?: Pageable;
  isFav: boolean;
  searchBy: string;
  // sort: { name: string, direction: string }[];
  maxPrice: number;
  minLikes: number;
  categories: { id: string }[];
}

export class FilterCockpit {
  pageable?: Pageable;
  // sort?: Sorting[];
  bookingDate: string;
  email: string;
  bookingToken: number;
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
