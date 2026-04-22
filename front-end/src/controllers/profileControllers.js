import * as services from '../services/profileServices.js';

async function getUser(req, res, at) {
    const response = await services.getUser(at);

    if (!response || !response.name) {
        return null
    } else {
        if (response.name.split(' ').length > 0) {
            response.firstLetters = response.name.split(' ')[0][0].toUpperCase() + response.name.split(' ')[response.name.split(' ').length - 1][0].toUpperCase();
        } else {
            response.firstLetters = response.name.charAt[0].toUpperCase();
        }
    
        return response;
    }

}

export {
    getUser
}