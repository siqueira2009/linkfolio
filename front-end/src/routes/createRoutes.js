import express from 'express';
import * as controllers from '../controllers/createProfileControllers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/createProfile.ejs');
});

router.post('/', async (req, res) => {
    const { name, pronouns, at, bio, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, customLinks } = req.body;

    controllers.createProfile(req, res, name, bio, pronouns, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, customLinks);
})

export default router;