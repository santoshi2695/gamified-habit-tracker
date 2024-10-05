import { ApiError } from './ApiError';
import { type Request, type Response } from 'express';

type RequestHandler = (req: Request, res: Response) => Promise<any>;

export const asyncHandler =
  (requestHandler: RequestHandler) =>
  (req: Request, res: Response): void => {
    Promise.resolve(requestHandler(req, res)).catch((err) => {
      console.log(err);
      if (err instanceof ApiError) {
        return res.status(err.statusCode || 500).json(err);
      } else {
        return res.status(500).json({
          message: 'Unexpected error occured',
        });
      }
    });
  };
