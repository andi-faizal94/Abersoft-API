import * as express from 'express';
import { getRepository } from 'typeorm';
import { AdminCustomer } from '../entity/AdminCustomer';

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const adminRepository = await getRepository(AdminCustomer);

    const { id, company, projectManager, worker } = req.body;
    const customer = await adminRepository.create({
      id,
      company,
      projectManager,
      worker,
    });
    await customer.save();
    return res.status(200).json({
      statusCode: 200,
      message: 'Succes',
      result: [customer],
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
    const adminRepository = await getRepository(AdminCustomer);

    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    // let whereCondition = {};
    const [data, total] = await adminRepository.findAndCount({
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
        nextpage: skip + 1,
        limit: take,
        totalPage: total_page,
        totalData: 100,
      },
      customer: data,
    });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const fileRepository = await getRepository(AdminCustomer);
    const { id } = req.params;
    if (!id) {
      throw new Error('it not id');
    }
    const deleteFile = await fileRepository.delete(Number(id));
    return res.status(200).json({
      statusCode: 200,
      message: 'Succes',
      deleteFile,
    });
  } catch (error) {
    next(error);
  }
};
