import { Book } from '../models/book.model.js';
import express from 'express';
import multer from 'multer';
import { uploadOnCloudinary } from '../utils/cloudinaryFileupload.js';
import fs from 'fs';
import mongoose from 'mongoose';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'pdf' }
]), async (req, res) => {
    try {
        const { title, author, publicationYear, genre, copies } = req.body;

        if (!title || !author || !publicationYear) {
            return res.status(400).send({ message: 'Please fill out all required fields' });
        }

        let imageUrl1 = null;
        let imageUrl2 = null;
        let pdfUrl = null;

        if (req.files.image1) {
            const localFilePath = req.files.image1[0].path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (!uploadResult) {
                return res.status(500).json({ error: 'Image 1 upload failed' });
            }
            imageUrl1 = uploadResult.secure_url;
            fs.unlinkSync(localFilePath);
        }

        if (req.files.image2) {
            const localFilePath = req.files.image2[0].path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (!uploadResult) {
                return res.status(500).json({ error: 'Image 2 upload failed' });
            }
            imageUrl2 = uploadResult.secure_url;
            fs.unlinkSync(localFilePath);
        }

        if (req.files.pdf) {
            const localFilePath = req.files.pdf[0].path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (!uploadResult) {
                return res.status(500).json({ error: 'PDF upload failed' });
            }
            pdfUrl = uploadResult.secure_url;
            fs.unlinkSync(localFilePath);
        }

        const newBook = {
            title,
            author,
            publicationYear,
            genre,
            copies,
            imageUrl1,
            imageUrl2,
            pdfUrl
        };

        const book = await Book.create(newBook);
        res.status(201).json(book);
                
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server Error: ' + error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server Error: ' + error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server Error: ' + error.message });
    }
});

router.put('/:id', upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'pdf' }
]), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publicationYear, genre, copies } = req.body;

        if (!title || !author || !publicationYear) {
            return res.status(400).send({ message: 'Please fill out all required fields' });
        }

        let imageUrl1 = req.body.imageUrl1 || null;
        let imageUrl2 = req.body.imageUrl2 || null;
        let pdfUrl = req.body.pdfUrl || null;

        if (req.files.image1) {
            const localFilePath = req.files.image1[0].path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (uploadResult) {
                imageUrl1 = uploadResult.secure_url;
                fs.unlinkSync(localFilePath);
            } else {
                return res.status(500).json({ error: 'Image 1 upload failed' });
            }
        }

        if (req.files.image2) {
            const localFilePath = req.files.image2[0].path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (uploadResult) {
                imageUrl2 = uploadResult.secure_url;
                fs.unlinkSync(localFilePath);
            } else {
                return res.status(500).json({ error: 'Image 2 upload failed' });
            }
        }

        if (req.files.pdf) {
            const localFilePath = req.files.pdf[0].path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (uploadResult) {
                pdfUrl = uploadResult.secure_url;
                fs.unlinkSync(localFilePath);
            } else {
                return res.status(500).json({ error: 'PDF upload failed' });
            }
        }

        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            publicationYear,
            genre,
            copies,
            imageUrl1,
            imageUrl2,
            pdfUrl
        }, { new: true });

        if (!updatedBook) {
            return res.status(404).send({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).send({ message: 'Server Error: ' + error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });
            
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server Error: ' + error.message });
    }
});

export default router;
