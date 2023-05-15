import mongoose, { Schema, model, models } from 'mongoose';

const wordSchema = new Schema(
  {
    text_es: String,
    text_en: String,
    rating: {
      type: Number,
      min: -100000,
      max: 100000,
    },
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

const Word = models['Word'] || model('Word', wordSchema);

export default Word;
