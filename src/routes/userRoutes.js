import express from 'express';
import * as controllers from '../controllers/userControllers.js'

const router = express.Router();

router.get('/:user', (req, res) => {
    const user = req.params.user;

    controllers.getUserByUser(req, res, user);
})

router.post('/', (req, res) => {
    const {name, user, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok} = req.body;

    controllers.postUser(req, res, name, user, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok);
})

export default router