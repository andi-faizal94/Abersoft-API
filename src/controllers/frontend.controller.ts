import * as express from 'express';
import { getRepository } from 'typeorm';
import { Frontend } from '../entity/Frontend';
import * as jwt from 'jsonwebtoken';

// const maxAge = 3 * 24 * 60 * 60;
// export const createToken = (id) => {
//   return jwt.sign({ id }, 'secretkey', {
//     experesIn: maxAge,
//   });
// };

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const frontendRepository = await getRepository(Frontend);

    const { id, fullname, email, password } = req.body;
    const token = jwt.sign({ id }, 'secret key', (err, token) => {
      res.json({
        token,
      });
    });
    const frontend = await frontendRepository.create({
      id,
      fullname,
      email,
      password,
    });
    await frontend.save();
    return res.status(200).json({
      message: 'created user succesfully',
      data: [frontend, token],
    });
  } catch (error) {
    next(error);
  }
};

// get all data
export const stores = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const frontendRepository = await getRepository(Frontend);

    const { id, fullname, email, password } = req.body;
    const token = jwt.sign({ id }, 'secret key', (err, token) => {
      res.json({
        token,
      });
    });
    const frontend = await frontendRepository.create({
      id,
      fullname,
      email,
      password,
    });
    await frontend.save();
    return res.status(200).json({
      message: 'created user succesfully',
      data: [frontend, token],
    });
  } catch (error) {
    next(error);
  }
};
