import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Routers
import authRouter from './other/auth';
import hotelsRouter from './routes/explore';
import reviewsRouter from './routes/reviews';
import productsRouter from './routes/product';
import reservation from './other/reservation';
import bookingsRouter from './other/userBookings';
import newsletterRouter from './routes/newsletter';
import helpRouter from './routes/help1';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
    'http://localhost:5173',
    'https://terraquest-frontend.onrender.com'
];


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/help1', helpRouter);
app.use('/api/reservations', reservation);
app.use('/api/bookings', bookingsRouter);
app.use('/api/newsletter', newsletterRouter);


app.use('/img', express.static(path.resolve(__dirname, 'img')));


app.get('/', (req: Request, res: Response) => {
    res.send('✅ Backend działa 🚀');
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Coś poszło nie tak!' });
});


app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});

export default app;
