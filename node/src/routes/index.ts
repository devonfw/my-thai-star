import { Request, Response } from "express";

export function indexGET(req: Request, res: Response)  {
        res.send("It Works");
}
