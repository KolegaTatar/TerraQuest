import express, { Request, Response } from 'express';
import { supabase } from "../supabaseClient";

const router = express.Router();

const localImages = [
    'https://terraquest-backend.onrender.com/img/u1k.webp',
    'https://terraquest-backend.onrender.com/img/u2m.webp',
    'https://terraquest-backend.onrender.com/img/u3m.webp',
    'https://terraquest-backend.onrender.com/img/u4k.webp',
    'https://terraquest-backend.onrender.com/img/u5m.webp',
    'https://terraquest-backend.onrender.com/img/u6k.webp',
    'https://terraquest-backend.onrender.com/img/u7k.webp',
    'https://terraquest-backend.onrender.com/img/u8m.webp',
    'https://terraquest-backend.onrender.com/img/u9m.webp',
    'https://terraquest-backend.onrender.com/img/u10k.webp',
];


const getRandomImageByGender = (isFemale: boolean): string => {
    const genderImages = localImages.filter(img => isFemale ? img.includes('k.webp') : img.includes('m.webp'));
    const randomIndex = Math.floor(Math.random() * genderImages.length);
    return genderImages[randomIndex];
};

router.get('/', async (req: Request, res: Response) => {
    try {
        const { data: reviews, error } = await supabase
            .from('reviews_terraQuest')
            .select('title, description, reviewer, date, rating');

        if (error || !reviews || reviews.length === 0) {
            res.status(404).json({ error: 'Brak recenzji w bazie' });
            return;
        }

        const reviewsWithImages = reviews.map((review: any) => {
            const reviewerName = review.reviewer || '';
            const isFemale = reviewerName.trim().slice(-1).toLowerCase() === 'a';
            const image = getRandomImageByGender(isFemale);
            return { ...review, image };
        });

        res.json(reviewsWithImages);

    } catch (err) {
        console.error('❌ Błąd:', err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

export default router;
