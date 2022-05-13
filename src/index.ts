import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import index from './routes/router';
async function main() {
  try {
    const connection = await createConnection();
    const app = express();

    // morgan to log methods
    app.use(morgan('dev'));

    // body-parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // you can write cors with 2 ways:

    // 1. npm install cors
    app.use(cors());

    // 2. with set header
    // app.use(
    //   (
    //     req: express.Request,
    //     res: express.Response,
    //     next: express.NextFunction
    //   ) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header(
    //       "Access-Control-Allow-Headers",
    //       "Origin, X-Requested-With, Content-Type,Accept,Authorization"
    //     );
    //     if (req.method === "OPTIONS") {
    //       res.header(
    //         "Access-Control-Allow-Methods",
    //         "PUT,POST,PATCH,DELETE,GET"
    //       );
    //       return res.status(200).json({});
    //     }
    //     next();
    //   }
    // );

    app.use(index);

    app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(404).json({ status: 404, message: 'Page not found' });
    });

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server started on port ${process.env.SERVER_PORT}!`);
    });
  } catch (e) {
    console.log(e);
  }
}
main();
