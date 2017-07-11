import { Request, Response, Router as eRouter } from 'express';
import * as business from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/order', (req: Request, res: Response) => {
    try {
        // The booking token must be defined
        if (req.body.booking === undefined || req.body.booking.bookingToken === undefined) {
            throw { code: 400, message: 'No booking token given' };
        }

        // body content must be an OrderPostView
        if (!types.isOrderPostView(req.body)) {
            throw { code: 400, message: 'Parser error' };
        }

        if (req.body.orderLines === undefined || req.body.orderLines.length === 0) {
            throw { code: 400, message: 'Empty order' };
        }

        business.createOrder(req.body, (err: types.Error, orderReference?: any) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(201).json(orderReference);
            }
        });
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.post('/order/search', (req: Request, res: Response) => {
    try {
        // body content must be SearchCriteria
        if (!types.isSearchCriteria(req.body)) {
            throw { code: 400, message: 'Parse error' };
        }

        business.getOrders(req.body.pagination, (err, result) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.json(result);
            }
        }, req.body.sort);
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
});

router.post('/order/filter', (req: Request, res: Response) => {
    try {
        // body content must be SearchCriteria
        if (!types.isSearchCriteria(req.body)) {
            throw { code: 400, message: 'Parse error' };
        }

        business.getOrdersFiltered(req.body, (err, result) => {
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

router.get('/order/cancelorder/:id', (req: Request, res: Response) => {
    try {
        // para id must be defined
        if (req.params.id === undefined || typeof req.params.id === 'number') {
            throw { code: 400, message: 'No id given' };
        }

        business.cancelOrder(req.params.id, (err: types.Error) => {
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
