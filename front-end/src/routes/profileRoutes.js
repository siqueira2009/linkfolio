import express from 'express';
import * as controllers from '../controllers/profileControllers.js'

const router = express.Router();

router.get('/:at', async (req, res) => {
    const at = req.params.at;

    const user = await controllers.getUser(req, res, at)

    if (!user) {
        res.redirect('/create');
    } else {
        res.render('pages/user.ejs', {user})
    }
});

router.post('/:at', (req, res) => {
    const at = req.params.at;
    const bodyData = req.body;

    controllers.updateUser(req, res, at, bodyData);
})

export default router;