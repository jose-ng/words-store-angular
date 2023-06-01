import { Request, Response } from 'express';
import Note from './modelsDB/note';
import connectMongo from './utils/connectMongo';
import * as express from 'express';
import { isAuthenticated } from './middleware/auth';

export class NoteAPI {
  api(app: express.Express): void {
    // Update Rating
    app
      .route('/api/note/updateRating')
      .post(isAuthenticated, async (req: Request, res: Response) => {
        try {
          await connectMongo();
          const note = await Note.findById(req.body.id).exec();
          const updated = await Note.findOneAndUpdate(
            { _id: req.body.id },
            { rating: (note.rating || 0) + req.body.rating },
            { new: true }
          ).exec();

          res.status(200).json(updated);
        } catch (err) {
          res.status(400).json({ error: 'Internal server error' });
        }
      });

    // Create Note
    app
      .route('/api/note')
      .post(isAuthenticated, async (req: Request, res: Response) => {
        try {
          await connectMongo();
          const newNote = req.body;
          delete newNote.code;
          const note = await Note.create(newNote);
          res.status(201).json(note);
        } catch (err) {
          res.status(400).json({ error: 'Internal server error' });
        }
      });

    // Get All Notes
    app.route('/api/note').get(async (req: Request, res: Response) => {
      try {
        await connectMongo();
        const { query } = req;
        const { q, skip, limit } = query;
        let params = {};
        if (q)
          params = {
            $or: [
              { title: { $regex: q, $options: 'i' } },
              { text: { $regex: q, $options: 'i' } },
            ],
          };
        const notes = await Note.find(params)
          .skip((skip as unknown as number) * (limit as unknown as number))
          .limit(limit as unknown as number)
          .sort({ title: 'asc' })
          .exec();
        const totalNotes = await Note.count(params).exec();
        res.status(200).json({ notes, totalNotes });
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
