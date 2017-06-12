import { environment as env } from './../environments/environment';

export const config: any = {
    restPathRoot: 'http://de-mucdevondepl01:9090/mythaistar/',
    restServiceRoot:  'http://de-mucdevondepl01:9090/mythaistar/services/rest/',
    pageSizes: [8, 16, 24],
    roles: [
        {name: 'CUSTOMER', permission: 0},
        {name: 'WAITER', permission: 1},
    ],
};
