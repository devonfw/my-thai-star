import { Http, BaseRequestOptions, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { dishes } from './mock-data';

export function backendFactory(backend: MockBackend, options: BaseRequestOptions) {
    backend.connections.subscribe((connection: MockConnection) => {

        // WRAP IN TIMEOUT TO SIMULATE SERVER API CALL
        setTimeout(() => {
            // DEFINE OPERATIONS
            if (connection.request.url.endsWith('/v1/getdishes')) {
                // debugger
                connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            dishes: dishes
                        }
                    })));
            }
        }, 0);
    });

    return new Http(backend, options);
}

export let backendProvider = {
    provide: Http,
    useFactory: backendFactory,
    deps: [MockBackend, BaseRequestOptions]
};