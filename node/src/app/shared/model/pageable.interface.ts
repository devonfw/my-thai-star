export interface IPageable {
  pageSize: number;
  pageNumber: number;
  sort?: ISort[];
}

export interface ISort {
  property: string;
  direction: string;
}
