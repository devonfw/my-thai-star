import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/Order', (req: Request, res: Response) => {
    bussiness.createOrder(req.body, (err: types.IError ) => {
        if (err) {
            res.status(err.code).json(err.message);
        } else {
            res.status(201).json({jeje: 'jaja'});
        }
    });
});

router.delete('/v1/Delete', (req: Request, res: Response) => {
    res.json({ todo: 'true' });
});