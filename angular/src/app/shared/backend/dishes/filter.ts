export class Filter {
    favourite: boolean;
    searchTerm: string;
    sortBy: string;
    price: number;
    likes: number;
    category: {
        main: boolean;
        starter: boolean;
        dessert: boolean;
        noodle: boolean;
        rice: boolean;
        curry: boolean;
        vegan: boolean;
        vegetarian: boolean;
        favourites: boolean;
    };
}
