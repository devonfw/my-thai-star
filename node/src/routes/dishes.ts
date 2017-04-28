import { Request, Response, Router as eRouter } from "express";
import { OrderView } from "../model/interfaces";
import bussiness from "../logic";
import * as api from "../model/interfaces";

export const router = eRouter();

router.get("/", (req: Request, res: Response) => {
        bussiness.getDihses((err: api.Error, dishes: api.DishView[]) => {
                if (err) {
                        res.status(500).json(err);
                } else {
                        res.json(dishes);
                }
        });
});
