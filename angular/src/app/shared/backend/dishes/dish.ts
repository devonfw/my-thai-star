export class Dish {
    favourite: boolean;
    image: string;
    likes: number;
    options: {name: string, price: number, selected: boolean}[];
    orderDescription: string;
    orderName: string;
    price: number;
}
