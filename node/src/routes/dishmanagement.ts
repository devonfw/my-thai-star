import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/Dish/Search', (req: Request, res: Response) => {
    // res.send(req.body);

    bussiness.getDishes(req.body, (err: types.IError, dishes: types.IDishView[]) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else {
            res.json(dishes);
        }
    });

});
