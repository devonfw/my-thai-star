export class Dish {
    isfav: boolean;
    image: string;
    likes: number;
    extras: {name: string, price: number, selected: boolean}[];
    description: string;
    name: string;
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
