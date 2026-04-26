import * as services from '../services/authServices.js' // Importa as funções de serviço

// Função que controla a verificação de senha (digitada e hasheada)
async function verifyPassword(req, res, at, password) {
    try { // Tenta chamar o serviço de comparar senhas
        const verification = await services.verifyPassword(at, password);
        return res.status(200).json({"mensagem": "Senha verificada", "resultado": verification}); // Retorna sucesso na verificação e se é igual
    } catch (error) { // Caso dê erro no serviço de verificação, retorna o erro
        return res.status(500).json({"mensagem": "Erro ao verificar senha!", "erro": error});
    }
}

// Exporta a função
export {
    verifyPassword
}