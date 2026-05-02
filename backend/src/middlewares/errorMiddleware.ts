import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Internal Server Error: ', err.message);
    res.status(500).json({
        status: "Error",
        message: err.message
    });
}
