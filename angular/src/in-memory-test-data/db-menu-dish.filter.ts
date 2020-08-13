export const filteredMenuDishes = {
  content: [
    {
      dish: {
        modificationCounter: 1,
        id: 0,
        name: 'Thai Spicy Basil Fried Rice',
        description: `This is a staple of Thai cooking. Adjust the spices to your own tastes for a really great
                                use for leftover rice!! I get the basil from a local Asian market. It has a different
                                flavor than that of regular basil and makes all the difference in this recipe.
                                It is fast and fairly easy to make, but requires constant stirring`,
        price: 12.99,
        imageId: 0,
      },
      image: {
        modificationCounter: 1,
        id: 0,
        name: 'basil-fried',
        content: '',
        contentType: 'Binary',
        mimeType: 'image/jpeg',
      },
      extras: [
        {
          modificationCounter: 1,
          id: 1,
          name: 'Extra curry',
          description: `The common feature is the use of complex combinations of spices or herbs, usually including
                                    fresh or dried hot chillies.`,
          price: 1.0,
        },
        {
          modificationCounter: 1,
          id: 0,
          name: 'Tofu',
          description: `Also known as bean curd, is a food made by coagulating soy milk and then pressing the resulting
                                    curds into soft white blocks. `,
          price: 1.0,
        },
      ],
      categories: [
        {
          modificationCounter: 1,
          id: 0,
          name: 'Main Dishes',
          description: 'Main Dishes',
          showOrder: 0,
        },
        {
          modificationCounter: 1,
          id: 4,
          name: 'Rice',
          description: 'Dishes that contain rice',
          showOrder: 2,
        },
        {
          modificationCounter: 1,
          id: 7,
          name: 'Vegetarian',
          description: 'Vegetarian food',
          showOrder: 2,
        },
      ],
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 1,
    sort: [],
  },
  totalElements: 1,
};
