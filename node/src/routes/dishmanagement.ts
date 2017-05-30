import { Request, Response, Router as eRouter } from 'express';
import * as bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/Dish/Search', (req: Request, res: Response) => {
    // res.send(req.body);

    const p = new Promise<string>(async (resolve, reject) => {
        const table = await bussiness.getFreeTable('2017-10-18 20:00:00.000', 3);

        console.log(table);

        if (table === 'error'){
            reject('error');
        } else {
            resolve(table);
        }

    }).then((e: string) => {
        console.log('Conseguiste la mesa ' + e);
    }).catch((err: string) => {
        console.log(err);
    });

    bussiness.getDishes(req.body, (err: types.IError, dishes: types.IPaginatedList) => {
        if (err) {
            res.status(500).json({message: err.message});
        } else {
            res.json(dishes);
        }
    });

});
