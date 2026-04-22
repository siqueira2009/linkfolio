import express from 'express';

const router = express.Router();

router.get('/u/:user', (req, res) => {
    const user = req.params.user;

    res.render('pages/user.ejs', {user})
});

export default router;