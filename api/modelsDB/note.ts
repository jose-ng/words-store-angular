import { Schema, model, models } from 'mongoose';

const noteSchema = new Schema(
  {
    title: String,
    text: String,
    urlImg: String,
  },
  {
    versionKey: false,
    id: true,
    toJSON: {
      transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id;
        delete returnedDocument._id;
        delete returnedDocument.__v;
      },
    },
  }
);

const Note = models['Note'] || model('Note', noteSchema);

export default Note;
