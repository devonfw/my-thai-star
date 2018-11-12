import { Request, Response, Router as eRouter } from 'express';
import * as business from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/dish/search', (req: Request, res: Response) => {
    try {
        // Check if body contains a valid filter
        if (!types.isFilterView(req.body)) {
            throw { code: 400, message: 'Invalid filter' };
        }

        // check filter values. Put the correct if neccessary
        business.checkFilter(req.body);

        // get the dishes
        business.getDishes(req.body, (err: types.Error, dishes: types.PaginatedList) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json(dishes);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
});
