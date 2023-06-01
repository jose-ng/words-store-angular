import { Request, Response } from 'express';
import Word from './modelsDB/word';
import connectMongo from './utils/connectMongo';
import { allowCreate } from './utils/misc';
import * as express from 'express';
import * as admin from 'firebase-admin';

export class WordAPI {
  api(app: express.Express): void {
    // Create Word
    app.route('/api/word').post(async (req: Request, res: Response) => {
      try {
        if (!allowCreate(req.body.code)) {
          res.status(403).json({ error: 'forbbiden' });
          return;
        }

        await connectMongo();
        const newWord = req.body;
        delete newWord.code;
        const word = await Word.create(newWord);

        res.status(201).json(word);
      } catch (err) {
        res.status(400).json({ error: 'Internal server error' });
      }
    });

    // Get All Words
    app.route('/api/word').get(async (req: Request, res: Response) => {
      try {
        const { authorization } = req.headers;
        const token = authorization?.split('Bearer ')[1];
        if (token && token.length > 20) {
          try {
            console.log(token);

            const decodedToken: admin.auth.DecodedIdToken = await admin
              .auth()
              .verifyIdToken(token);
            console.log('decodedToken', JSON.stringify(decodedToken));
          } catch (err) {
            console.log(err);
          }
        }

        await connectMongo();
        const { query } = req;
        const { q, skip, limit } = query;
        let params = {};
        if (q)
          params = {
            $or: [
              { text_en: { $regex: q, $options: 'i' } },
              { text_es: { $regex: q, $options: 'i' } },
            ],
          };
        const words = await Word.find(params)
          .skip((skip as unknown as number) * (limit as unknown as number))
          .limit(limit as unknown as number)
          .sort({ rating: 'desc' })
          .exec();
        const totalWords = await Word.count(params).exec();
        res.status(200).json({ words, totalWords });
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });

    app
      .route('/api/word/updateRating')
      .post(async (req: Request, res: Response) => {
        try {
          if (!allowCreate(req.body.code)) {
            res.status(403).json({ error: 'forbbiden' });
            return;
          }

          await connectMongo();
          const word = await Word.findById(req.body.id).exec();
          const updated = await Word.findOneAndUpdate(
            { _id: req.body.id },
            { rating: (word.rating || 0) + req.body.rating },
            { new: true }
          ).exec();

          res.status(200).json(updated);
        } catch (err) {
          res.status(400).json({ error: 'Internal server error' });
        }
      });

    // // Get Single Word
    // app
    //   .route('/api/word/:id')
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
