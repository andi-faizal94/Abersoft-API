import { Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.util';

export default async (req: Request, res: Response, next: any) => {
  try {
    const token: any = req.headers.authorization?.split(' ')[1];
    const payload = verifyToken;
    next();
  } catch (err: any) {
    next(err);
  }
};
