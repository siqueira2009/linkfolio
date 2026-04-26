import * as services from '../services/createProfileServices.js'

async function createProfile(req, res, bodyData) {
    const response = await services.createProfile(bodyData);

    if (!response) {
        res.status(500).json({"erro": "Erro ao criar perfil"})
        return;
    }

    res.redirect(`/u/${bodyData.at}`)
}

export {
    createProfile
}