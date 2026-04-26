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

async function updateUser(req, res, at, bodyData) {
    try {
        const response = await services.updateUser(at, bodyData);
    
        res.redirect(`/u/${at}`);
    } catch (error) {
        res.status(500).json({"mensagem": "Erro ao atualizar perfil!", "erro": error});
    }
}

export {
    getUser,
    updateUser
}