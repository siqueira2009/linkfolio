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

export default router;