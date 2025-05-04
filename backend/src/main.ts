import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import routers
import authRouter from './other/auth';
import hotelsRouter from './routes/explore';
import reviewsRouter from './routes/reviews';
import productsRouter from './routes/product';
import reservationRouter from './other/reservation';
import bookingsRouter from './other/userBookings';
import newsletterRouter from './routes/newsletter';
import helpRouter from './routes/help1';

// Environment configuration
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
    'https://terraquest-frontend.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean) as string[];

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Standard Middleware
app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Static Files
app.use('/img', express.static(path.join(__dirname, 'img')));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/help', helpRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/newsletter', newsletterRouter);

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version
    });
});

// Main Endpoint
app.get('/', (req: Request, res: Response) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>TerraQuest Backend</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 2rem; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 0.5rem 0; }
          a { color: #007bff; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>✅ TerraQuest Backend Service</h1>
        <h2>Environment: ${process.env.NODE_ENV || 'development'}</h2>
        <h3>Available Endpoints:</h3>
        <ul>
          <li><a href="/api/health">/api/health</a> - Service health check</li>
          <li><a href="/api/hotels">/api/hotels</a> - Hotel listings</li>
          <li><a href="/api/reviews">/api/reviews</a> - Customer reviews</li>
          <li><a href="/api/bookings">/api/bookings</a> - Booking management</li>
        </ul>
      </body>
    </html>
  `);
});

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Endpoint not found',
        documentation: `${req.protocol}://${req.get('host')}/`
    });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${err.stack}`);

    const errorResponse = {
        error: 'Internal Server Error',
        message: isProduction ? undefined : err.message,
        path: req.path,
        timestamp: new Date().toISOString()
    };

    res.status(500).json(errorResponse);
});

// Start Server
app.listen(PORT, () => {
    console.log(`
  🚀 Server successfully started
  ⏱️  ${new Date().toLocaleString()}
  🌐 Environment: ${process.env.NODE_ENV || 'development'}
  📡 Running on port: ${PORT}
  🔗 Allowed Origins: ${allowedOrigins.join(', ')}
  
  📚 API Documentation:
  http://localhost:${PORT}/
  `);
});

export default app;