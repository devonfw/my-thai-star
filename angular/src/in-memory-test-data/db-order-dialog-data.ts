export const dialogOrderDetails = {
  order: {
    modificationCounter: 1,
    id: 0,
    bookingId: 0,
    invitedGuestId: null,
    bookingToken: null,
    hostId: 0,
  },
  booking: {
    modificationCounter: 1,
    id: 0,
    name: 'user0',
    bookingToken: 20170509123502555,
    comment: 'Booking Type CSR',
    bookingDate: 1591116940.063678,
    expirationDate: 1591113340.063678,
    creationDate: 1590684940.063678,
    email: 'user0@mail.com',
    canceled: false,
    bookingType: 'COMMON',
    tableId: 0,
    orderId: 0,
    assistants: 3,
    userId: 0,
  },
  invitedGuest: null,
  orderLines: [
    {
      orderLine: {
        modificationCounter: 1,
        id: 0,
        orderId: 0,
        dishId: 0,
        amount: 2,
        comment: 'please not too spicy',
      },
      order: null,
      dish: {
        modificationCounter: 1,
        id: 0,
        name: 'Thai Spicy Basil Fried Rice',
        description: `This is a staple of Thai cooking. Adjust the spices to your own tastes for a really great use for
                        leftover rice!! I get the basil from a local Asian market. It has a different flavor than that of
                        regular basil and makes all the difference in this recipe. It is fast and fairly easy to make, but requires
                        constant stirring`,
        price: 12.99,
        imageId: 0,
      },
      extras: [
        {
          modificationCounter: 1,
          id: 1,
          name: 'Extra curry',
          description: `The common feature is the use of complex combinations of spices or herbs, usually including fresh or dried
                            hot chillies.`,
          price: 1,
        },
      ],
    },
    {
      orderLine: {
        modificationCounter: 1,
        id: 1,
        orderId: 0,
        dishId: 4,
        amount: 1,
        comment: null,
      },
      order: null,
      dish: {
        modificationCounter: 1,
        id: 4,
        name: 'Thai Thighs Fish/Prawns',
        description: `Grill over a smoker or just brown in the oven - these moreish Fish pieces or prawns are marinated in a blend
                            of lime and pineapple juice, chilli and ginger.`,
        price: 8.99,
        imageId: 4,
      },
      extras: [
        {
          modificationCounter: 1,
          id: 1,
          name: 'Extra curry',
          description: `The common feature is the use of complex combinations of spices or herbs, usually including fresh or dried
                            hot chillies.`,
          price: 1,
        },
      ],
    },
    {
      orderLine: {
        modificationCounter: 1,
        id: 2,
        orderId: 0,
        dishId: 2,
        amount: 1,
        comment: null,
      },
      order: null,
      dish: {
        modificationCounter: 1,
        id: 2,
        name: 'Thai green chicken curry',
        description: `Master this aromatic, creamy & extremely tasty chicken Thai green curry recipe from Jamie Oliver & treat
                        yourself to an authentic taste of South East Asia.`,
        price: 14.75,
        imageId: 2,
      },
      extras: [
        {
          modificationCounter: 1,
          id: 0,
          name: 'Tofu',
          description: `Also known as bean curd, is a food made by coagulating soy milk and then pressing the resulting curds into
                            soft white blocks. `,
          price: 1,
        },
        {
          modificationCounter: 1,
          id: 1,
          name: 'Extra curry',
          description: `The common feature is the use of complex combinations of spices or herbs, usually including fresh or dried hot
                            chillies.`,
          price: 1,
        },
      ],
    },
  ],
  host: {
    modificationCounter: 1,
    id: 0,
    name: 'user0',
    bookingToken: 'CB_20170509_123502555Z',
    comment: 'Booking Type CSR',
    bookingDate: 1591116940.063678,
    expirationDate: 1591113340.063678,
    creationDate: 1590684940.063678,
    email: 'user0@mail.com',
    canceled: false,
    bookingType: 'COMMON',
    tableId: 0,
    orderId: 0,
    assistants: 3,
    userId: 0,
  },
};
