import { Request, Response, Router as eRouter } from 'express';
import bussiness from '../logic';
import * as types from '../model/interfaces';

export const router = eRouter();

router.get('/v1/Reservation/UpdateInvitation', (req: Request, res: Response) => {
        res.json({todo: 'true'});
});

router.get('/v1/Reservation/CancelInvitation', (req: Request, res: Response) => {
        res.json({todo: 'true'});
});