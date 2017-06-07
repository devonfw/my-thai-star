import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/order', (req: Request, res: Response) => {
    try {
        // The booking token must be defined
        if (req.body.booking === undefined || req.body.booking.bookingToken === undefined) {
            throw { code: 400, message: 'No booking token given' };
        }

        // body content must be an OrderPostView
        if (!types.isOrderPostView(req.body)) {
            throw { code: 400, message: 'Parser error' };
        }

        bussiness.createOrder(req.body, (err: types.Error) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.post('/v1/order/search', (req: Request, res: Response) => {
    try {
        // body content must be SearchCriteria
        if (!types.isSearchCriteria(req.body)) {
            throw { code: 400, message: 'Parse error' };
        }

        bussiness.getOrders(req.body.pagination, (err, result) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.json(result);
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.post('/v1/order/filter', (req: Request, res: Response) => {
    try {
        // body content must be SearchCriteria
        if (!types.isSearchCriteria(req.body)) {
            throw { code: 400, message: 'Parse error' };
        }

        bussiness.getOrdersFiltered(req.body, (err, result) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.json(result);
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.get('/v1/order/cancelorder/:id', (req: Request, res: Response) => {
    try {
        // para id must be defined
        if (req.params.id === undefined || typeof req.params.id === 'number') {
            throw { code: 400, message: 'No id given' };
        }

        bussiness.cancelOrder(req.params.id, (err: types.Error) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});
