import jwt from 'jsonwebtoken'; // Importa a biblioteca do JWT
// O JWT é uma biblioteca que gera um crachá para cada usuário
// Depois de digitar a senha e provar que é você mesmo, ele gera um crachá com o seu arroba (inforjável)

const JWT_SECRET = process.env.JWT_SECRET; // Pega o segredo JWT

function requireOwner(req, res, next) {
    const authHeader = req.headers.authorization; // Pega a autorização que vem do header da requisição

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // Se não houver autorização, retorna erro
        return res.status(401).json({ erro: 'Token ausente' });
    }

    // Se houver...
    const token = authHeader.split(' ')[1]; // Tenta pegar o token

    try { // Depois tenta...
        const payload = jwt.verify(token, JWT_SECRET); // Verificar se o token é válido

        if (payload.at != req.params.at) { // Se o arroba da verificação for diferente do da requisição 
            return res.status(403).json({ erro: 'Sem permissão para editar esta conta' }); // Retorna que não possui permissão
        }

        req.user = payload; // Guarda os dados da verificação da requisição (para usar depois)
        next(); // Passa para a próxima parte
    } catch (error) { // Se der erro na verificação...
        return res.status(401).json({ erro: 'Token inválido ou expirado' }); // Retorna que o token é inválido
    }
}

// Exporta a função
export default requireOwner;