import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.get('/', (req: Request, res: Response) => {
        bussiness.getDihses((err: types.IError, dishes: types.IDishView[]) => {
                if (err) {
                        res.status(500).json(err);
                } else {
                        res.json(dishes);
                }
        });
});

router.post('/', (req: Request, res: Response) => {
        // res.send(req.body);
        bussiness.getDishesFiltered(req.body, (err: types.IError, dishes: types.IDishView[]) => {
                if (err) {
                        res.status(500).json(err);
                } else {
                        res.json(dishes);
                }
        });
});
