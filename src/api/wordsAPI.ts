import { Request, Response, NextFunction } from 'express';
import Word from './modelsDB/word';

export class WordAPi {
  songRoute(app: any): void {
    // Create Word
    app
      .route('/api/create')
      .post((req: Request, res: Response, next: NextFunction) => {
        Word.create(req.body, (error: any, data: any) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        });
      });

    // Get All Words
    app
      .route('/api/get')
      .get((req: Request, res: Response, next: NextFunction) => {
        Word.find((error: any, data: any) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        });
      });

    // Get Single Word
    app
      .route('/api/get/:id')
      .get((req: Request, res: Response, next: NextFunction) => {
        const id: any = req.params['id'];
        Word.findById(id, (error: any, data: any) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        });
      });

    // Update Word
    app
      .route('/api/update/:id')
      .put((req: Request, res: Response, next: NextFunction) => {
        Word.findByIdAndUpdate(
          req.params['id'],
          {
            $set: req.body,
          },
          (error: any, data: any) => {
            if (error) {
              return next(error);
            } else {
              res.json(data);
              console.log('Data updated successfully');
            }
          }
        );
      });

    // Delete Word
    app
      .route('/api/delete/:id')
      .delete((req: Request, res: Response, next: NextFunction) => {
        const id: any = req.params['id'];
        Word.findOneAndRemove(id, (error: any, data: any) => {
          if (error) {
            return next(error);
          } else {
            res.status(200).json({
              msg: data,
            });
          }
        });
      });
  }
}
