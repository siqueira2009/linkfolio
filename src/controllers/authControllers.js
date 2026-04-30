import jwt from 'jsonwebtoken'; // Importa a biblioteca de JWT
import * as services from '../services/authServices.js' // Importa as funções de serviço

const JWT_SECRET = process.env.JWT_SECRET; // Pega o token JWT

// Função que controla a verificação de senha (digitada e hasheada)
async function verifyPassword(req, res, at, password) {
    try { // Tenta chamar o serviço de comparar senhas
        const verification = await services.verifyPassword(at, password);

        if (!verification) { // não revela se o user existe ou se a senha está errada
            return res.status(401).json({ "mensagem": "Credenciais inválidas" });
        }

        const token = jwt.sign({ at }, JWT_SECRET, { expiresIn: '1h' }); // Gera um token assinado com o arroba do dono

        return res.status(200).json({ // Retorna sucesso na verificação e se é igual
            "mensagem": "Senha verificada",
            "resultado": true,
            "token": token
        });
    } catch (error) { // Caso dê erro no serviço de verificação, retorna o erro
        return res.status(500).json({"mensagem": "Erro ao verificar senha!", "erro": error});
    }
}

// Exporta a função
export {
    verifyPassword
}