import * as express from 'express';
import { getRepository } from 'typeorm';
import { Admin } from '../entity/Admin';
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
    const adminRepository = await getRepository(Admin);

    const { id, fullname, email, password } = req.body;
    const token = jwt.sign({ id }, 'secret key', (err, token) => {
      res.json({
        token,
      });
    });
    const admin = await adminRepository.create({
      id,
      fullname,
      email,
      password,
    });
    await admin.save();
    return res.status(200).json({
      message: 'created user succesfully',
      data: [admin, token],
    });
  } catch (error) {
    next(error);
  }
};

// get all data
export const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const adminRepository = await getRepository(Admin);

    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    const [data, total] = await adminRepository.findAndCount({
      take,
      skip,
    });

    if (!data) {
      throw new Error('Not Found!!');
    }

    const total_page = Math.ceil(total / take);

    return res.status(200).json({
      statusCode: 200,
      message: 'Succes',
      meta: {
        page: page,
        limit: take,
        nextpage: skip + 1,
      },
      result: {
        customer: data,
      },
    });
  } catch (error) {
    next(error);
  }
};
