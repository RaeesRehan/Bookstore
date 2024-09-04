import express from 'express';
import {PORT, DBURL} from './config.js'
import mongoose from 'mongoose'
import booksRoutes from './routes/books.routes.js'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']

 }));



app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/books', booksRoutes)

async function connectDB(){
    try {
        await mongoose.connect(DBURL)
        console.log('Connected to MongoDB')

            app.listen(PORT, ()=>{
                console.log(`Server is running on port ${PORT}`); 
            })
   
} catch (error) {
        console.log(error)
}}

connectDB();
