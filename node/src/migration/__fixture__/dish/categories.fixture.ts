import { Category } from '../../../app/dish/model/entities/category.entity';

export const categoriesSample: Category[] = [
  { id: 1, modificationCounter: 1, name: 'Main Dishes', description: 'Main Dishes', showOrder: 0 },
  { id: 2, modificationCounter: 1, name: 'Starter', description: 'Starter Dishes', showOrder: 1 },
  { id: 3, modificationCounter: 1, name: 'Dessert', description: 'Dessert', showOrder: 2 },
  { id: 4, modificationCounter: 1, name: 'Noodle', description: 'Dishes that contain noodles', showOrder: 2 },
  { id: 5, modificationCounter: 1, name: 'Rice', description: 'Dishes that contain rice', showOrder: 2 },
  { id: 6, modificationCounter: 1, name: 'Curry', description: 'Dishes with curry', showOrder: 2 },
  { id: 7, modificationCounter: 1, name: 'Vegan', description: 'Vegan food', showOrder: 2 },
  { id: 8, modificationCounter: 1, name: 'Vegetarian', description: 'Vegetarian food', showOrder: 2 },
  { id: 9, modificationCounter: 1, name: 'Drinks', description: 'Hot & Cold Drinks', showOrder: 2 },
];
