import * as services from '../services/authServices.js'

async function verifyPassword(req, res, at, password) {
    try {
        const verification = await services.verifyPassword(at, password);
        res.status(200).json({"mensagem": "Senha verificada", "resultado": verification});
    } catch (error) {
        res.status(500).json({"mensagem": "Erro ao verificar senha!", "erro": error});
    }
}

export {
    verifyPassword
}