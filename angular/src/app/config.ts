export const config: any = {
    restPathRoot:  'http://localhost:8081/mythaistar/',
    restServiceRoot:  'http://localhost:8081/mythaistar/services/rest/',
    pageSizes: [8, 16, 24],
    roles: [
        {name: 'CUSTOMER', permission: 0},
        {name: 'WAITER', permission: 1},
    ],
};
