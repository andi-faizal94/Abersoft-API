import * as express from 'express';
import { getRepository } from 'typeorm';
import { Profile } from '../entity/Profile';

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const customerRepository = await getRepository(Profile);
    const name = 'cong fandi';
    const role = 'programmer';
    const { id, customeName, contactInfos, project } = req.body;
    const customer = await customerRepository.insert(req.body);
    // await project.save();
    return res.status(200).json({
      message: 'created user succesfully',
      result: {
        profile: { name: name, role: role },
        customer: customer,
      },
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
    const customerRepository = await getRepository(Profile);
    const name = 'cong fandi';
    const role = 'programmer';
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    // let whereCondition = {};
    const [data, total] = await customerRepository.findAndCount({
      //   where: whereCondition,
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
        profile: { name: name, role: role },
        reportedProject: data,
      },
    });
  } catch (error) {
    next(error);
  }
};
