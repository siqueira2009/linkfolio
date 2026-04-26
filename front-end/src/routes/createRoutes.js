import express from 'express';
import * as controllers from '../controllers/createProfileControllers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/createProfile.ejs');
});

router.post('/', async (req, res) => {
    const bodyData = req.body;
    
    console.log(bodyData);

    controllers.createProfile(req, res, bodyData);
})

export default router;