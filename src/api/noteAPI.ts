import { Request, Response } from 'express';
import Word from './modelsDB/word';
import connectMongo from './utils/connectMongo';
import { allowCreate } from './utils/misc';
import * as express from 'express';

export class NoteAPI {
  api(app: express.Express): void {
    // Create Note
    app.route('/api/note').post(async (req: Request, res: Response) => {
      try {
        if (!allowCreate(req.body.code)) {
          res.status(403).json({ error: 'forbbiden' });
          return;
        }

        await connectMongo();
        const newWord = req.body;
        delete newWord.code;
        const word = await Word.create(newWord);

        res.status(201).json({ word });
      } catch (err) {
        res.status(400).json({ error: 'Internal server error' });
      }
    });

    // Get All Notes
    app.route('/api/note').get(async (req: Request, res: Response) => {
      try {
        await connectMongo();
        const { body } = req;
        const { q, skip, limit } = body;
        let params = {};
        if (q)
          params = {
            $or: [
              { text_en: { $regex: q, $options: 'i' } },
              { text_es: { $regex: q, $options: 'i' } },
            ],
          };
        const words = await Word.find(params)
          .skip(skip * limit)
          .limit(limit)
          .sort({ rating: 'desc' })
          .exec();
        const totalWords = await Word.count(params).exec();
        res.status(200).json({ words, totalWords });
      } catch (err) {
        res.status(400).json({ error: 'Internal server error' });
      }
    });

    // // Get Single Word
    // app
    //   .route('/api/note/:id')
    //   .get((req: Request, res: Response, next: NextFunction) => {
    //     const id: any = req.params['id'];
    //     Word.findById(id, (error: any, data: any) => {
    //       if (error) {
    //         return next(error);
    //       } else {
    //         res.json(data);
    //       }
    //     });
    //   });

    // // Update Word
    // app
    //   .route('/api/update/:id')
    //   .put((req: Request, res: Response, next: NextFunction) => {
    //     Word.findByIdAndUpdate(
    //       req.params['id'],
    //       {
    //         $set: req.body,
    //       },
    //       (error: any, data: any) => {
    //         if (error) {
    //           return next(error);
    //         } else {
    //           res.json(data);
    //           console.log('Data updated successfully');
    //         }
    //       }
    //     );
    //   });

    // // Delete Word
    // app
    //   .route('/api/delete/:id')
    //   .delete((req: Request, res: Response, next: NextFunction) => {
    //     const id: any = req.params['id'];
    //     Word.findOneAndRemove(id, (error: any, data: any) => {
    //       if (error) {
    //         return next(error);
    //       } else {
    //         res.status(200).json({
    //           msg: data,
    //         });
    //       }
    //     });
    //   });
  }
}
