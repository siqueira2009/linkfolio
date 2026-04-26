import bycrypt from 'bcrypt'; // Importa a biblioteca de criptografia

// Função que criptografa a senha passada
async function hashPassword(req, res, next) {
    try {
        const password = req.body.password;

        // Se não houver senha, nem tenta criptografar
        if (!password) {
            return next();
        }

        const saltRounds = 10; // Define o número de iterações para gerar o hash, definindo a complexidade da criptografia
        const hashedPassword = await bycrypt.hash(password, saltRounds); // Gera o hash

        req.body.password = hashedPassword; // Muda o valor do password para a senha hasehada (será modificada mais a frente)

        next(); // Continua
    } catch (error) { // Caso dê erro, retorna erro
        res.status(500).json({"mensagem": "Erro ao criptografar a senha.", "erro": error });
        next();
    }
}

// Exporta a função
export default hashPassword;