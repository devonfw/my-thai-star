import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/order', (req: Request, res: Response) => {
    if (req.body.booking === undefined || req.body.booking.bookingToken === undefined) {
        res.status(400).json({ message: 'No Invitation token given' });
    } else if (!types.isOrderPostView(req.body)) {
        res.status(400).json({ message: 'Parser error' });
    } else {
        bussiness.createOrder(req.body, (err: types.Error) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});

// TODO: implementar
router.post('/v1/order/search', (req: Request, res: Response) => {
    if (!types.isPaginated(req.body.pagination)){
       res.status(400).json({message: 'Parse error'});
    } else {
        bussiness.getOrders(req.body.pagination, (err, result) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.json(result);
            }
        });
    }
});

router.get('/v1/order/cancelorder/:id', (req: Request, res: Response) => {
    if (req.params.id === undefined) {
        res.status(400).json({ message: 'No id given' });
    } else {
        bussiness.cancelOrder(req.params.id, (err: types.Error) => {
            if (err) {
                res.status(err.code).json(err.message);
            } else {
                res.status(204).json();
            }
        });
    }
});
