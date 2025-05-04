import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';

// Import routerów
import authRouter from './other/auth';
import hotelsRouter from './routes/explore';
import reviewsRouter from './routes/reviews';
import productsRouter from './routes/product';
import reservationRouter from './other/reservation';
import bookingsRouter from './other/userBookings';
import newsletterRouter from './routes/newsletter';
import helpRouter from './routes/help1';

// Konfiguracja środowiska
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

// Inicjalizacja Express
const app = express();
const PORT = process.env.PORT || 5000;

// Konfiguracja CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://terraquest-frontend.onrender.com',
    process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️ Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Middleware
app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use('/img', express.static(path.join(__dirname, 'img')));

// 1. Endpointy zgodne z istniejącym frontendem (bez /api)
app.use('/hotels', hotelsRouter);
app.use('/reviews', reviewsRouter);

// 2. Endpointy z prefiksem /api dla nowej wersji
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/help1', helpRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/newsletter', newsletterRouter);

// Health check endpoint dla Render
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Główny endpoint
app.get('/', (req: Request, res: Response) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>TerraQuest Backend</title>
      </head>
      <body>
        <h1>✅ TerraQuest Backend is running</h1>
        <h2>Environment: ${process.env.NODE_ENV || 'development'}</h2>
        <ul>
          <li><a href="/hotels">/hotels</a> (legacy)</li>
          <li><a href="/api/hotels">/api/hotels</a></li>
          <li><a href="/health">/health</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Obsługa błędów 404
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Globalny error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[${new Date().toISOString()}] ERROR:`, err.stack);

    const response = {
        error: 'Internal Server Error',
        message: isProduction ? undefined : err.message
    };

    res.status(500).json(response);
});

// Start serwera
app.listen(PORT, () => {
    console.log(`
  🚀 Server running on port ${PORT}
  🌐 Environment: ${process.env.NODE_ENV || 'development'}
  📌 Allowed origins: ${allowedOrigins.join(', ')}
  
  Legacy endpoints:
  - GET /hotels
  - GET /reviews
  
  API endpoints:
  - GET /api/hotels
  - GET /api/reviews
  
  Health check:
  - GET /health
  `);
});

export default app;