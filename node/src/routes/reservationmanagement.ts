import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.post('/v1/Reservation', (req: Request, res: Response) => {
        res.json({todo: 'true'});
});
