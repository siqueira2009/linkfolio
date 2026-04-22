import express from 'express';

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('pages/create_profile.ejs')
});

export default router;