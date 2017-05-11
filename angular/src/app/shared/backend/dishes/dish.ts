export class Dish {
    favourite: boolean;
    image: string;
    likes: number;
    options: {name: string, price: number, selected: boolean}[];
    orderDescription: string;
    orderName: string;
    price: number;
    categories: {
        main: boolean,
        starter: boolean,
        dessert: boolean,
        noodle: boolean,
        rice: boolean,
        curry: boolean,
        vegan: boolean,
        vegetarian: boolean,
    };
}
