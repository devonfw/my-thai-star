import { Provider } from '@angular/core/core';
import { DishView } from '../models/interfaces';
import { Http, BaseRequestOptions, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { dishes } from './mock-data';

export function backendFactory(backend: MockBackend, options: BaseRequestOptions): Http {
    backend.connections.subscribe((connection: MockConnection) => {

        // WRAP IN TIMEOUT TO SIMULATE SERVER API CALL
        setTimeout(() => {
            // DEFINE OPERATIONS
            if (connection.request.url.endsWith('/v1/dishes')) {
                connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            dishes: dishes,
                        },
                    })));
            }

            // Remark: REST paths should not include http keywords
            if (connection.request.url.endsWith('/v1/getbookingid')) {
                connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            event: {
                                tableId: Math.floor(1000000000 + Math.random() * 9000000000),
                            },
                        },
                    })));
            }

            if (connection.request.url.endsWith('/v1/postfilters')) {
                let params: any = JSON.parse(connection.request.getBody());
                let filteredMenu: DishView[];
                if (params.searchTerm) {
                    filteredMenu = dishes.slice(0, 1);
                } else {
                    filteredMenu = dishes;
                }
                connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            dishes: filteredMenu,
                        },
                    })));
            }

            if (connection.request.url.endsWith('/v1/postbooking')) {
                let params: any = JSON.parse(connection.request.getBody());
                connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            event: {
                                tableId: Math.floor(1000000000 + Math.random() * 9000000000),
                            },
                        },
                    })));
            }

            if (connection.request.url.endsWith('/v1/postinvitation')) {
                let params: any = JSON.parse(connection.request.getBody());
                connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            event: {
                                tableId: Math.floor(1000000000 + Math.random() * 9000000000),
                            },
                        },
                    })));
            }

        }, 0);
    });

    return new Http(backend, options);
}

export let backendProvider: Provider = {
    // Remark: Why overriding Http provider (quite low level) instead of crating dedicated services for dishes and reservations,
    // which would define contracts required for specific data kinds. Then one could implement separate provides for those services
    // (mock, offline, online, etc.). For mock implementation it would be enough to wrap data with observables
    // (Observables will be a common interface for Http as well). For an example of such dedicated providers,
    // which can be switched via env variables take a look here:
    // - https://github.com/devonfw/devonfw-it-survival/blob/final-extras/app/shared/legoShopOffline.service.ts
    // - https://github.com/devonfw/devonfw-it-survival/blob/final-extras/app/shared/legoShopOnline.service.ts
    // = https://github.com/devonfw/devonfw-it-survival/blob/final-extras/app/lego-shop/legoShop.module.ts
    provide: Http,
    useFactory: backendFactory,
    deps: [MockBackend, BaseRequestOptions],
};
