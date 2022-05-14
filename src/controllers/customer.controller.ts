import * as express from 'express';
import { getRepository } from 'typeorm';
import { Customer } from '../entity/Customer';

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const customerRepository = await getRepository(Customer);

    const { id, fileName, filePath, fileSize, fileType, fileSuffix, fileId } =
      req.body;
    const customer = await customerRepository.insert(req.body);
    // await project.save();
    return res.status(200).json({
      message: 'created user succesfully',
      data: [customer],
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
    const customerRepository = await getRepository(Customer);

    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    const [data, total] = await customerRepository.findAndCount({
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
