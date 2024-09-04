import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    publicationYear: { type: Number, required: false, default: null },
    genre: { type: String, required: false },
    copies: { type: Number, required: false, default: 0 },
    imageUrl1: { type: String }, 
    imageUrl2: { type: String },
    pdfUrl: { type: String },
}, 
  {
  timestamps: true,
});

export const Book = mongoose.model('Book', bookSchema)