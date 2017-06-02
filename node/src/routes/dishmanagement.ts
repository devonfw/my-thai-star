import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/Dish/Search', (req: Request, res: Response) => {
    if (!types.isFilterView(req.body)) {
        res.status(400).json({ message: 'Invalid filter' });
    } else {
        bussiness.getDishes(req.body, (err: types.Error, dishes: types.PaginatedList) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json(dishes);
            }
        });
    }
});
