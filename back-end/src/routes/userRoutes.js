import express from 'express';
import * as controllers from '../controllers/userControllers.js'

const router = express.Router();

router.get('/:at', (req, res) => {
    const at = req.params.at;

    controllers.getUserByAt(req, res, at);
})

router.post('/', (req, res) => {
    const {name, pronouns, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, links} = req.body;

    controllers.postUser(req, res, name, pronouns, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, links);
});

router.delete('/:at', (req, res) => {
    const at = req.params.at;

    controllers.deleteUser(req, res, at);
})

export default router