import * as express from 'express';
import { getRepository } from 'typeorm';
import { File } from '../entity/File';

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const fileRepository = await getRepository(File);

    const { id, fileName, fileSize, fileType, fileSuffix, fileId } = req.body;
    const filePath = req.file?.path;
    const customer = await fileRepository.insert({ ...req.body, filePath });
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
    const fileRepository = await getRepository(File);

    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;

    // let whereCondition = {};
    const [data, total] = await fileRepository.findAndCount({
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
        customer: data,
      },
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
    const fileRepository = await getRepository(File);
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
