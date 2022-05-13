import * as express from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const projectRepository = await getRepository(Project);

    const {
      id,
      projectName,
      customer,
      reportedHours,
      projectManager,
      company,
      latitude,
      longitude,
      isInvoiced,
    } = req.body;
    const user = await projectRepository.create({
      id,
      projectName,
      customer,
      reportedHours,
      projectManager,
      company,
      latitude,
      longitude,
      isInvoiced,
    });
    await user.save();
    return res.status(200).json({
      message: 'created user succesfully',
      data: [user],
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
    const projectRepository = await getRepository(Project);

    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    // let whereCondition = {};
    const [data, total] = await projectRepository.findAndCount({
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
      result: {
        meta: {
          page: page,
          nextpage: skip + 1,
          limit: take,
          totalPage: total_page,
          totalData: 100,
        },
        project: data,
      },
    });
  } catch (error) {
    next(error);
  }
};