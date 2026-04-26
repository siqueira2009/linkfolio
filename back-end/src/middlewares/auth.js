import bycrypt from 'bcrypt';

async function hashPassword(req, res, next) {
    try {
        const password = req.body.password;

        if (!password) {
            return next();
        }

        const saltRounds = 10;
        const hashedPassword = await bycrypt.hash(password, saltRounds);

        req.body.password = hashedPassword;

        next();
    } catch (error) {
        res.status(500).json({"mensagem": "Erro ao processar a senha.", "erro": error });
    }
}

export default hashPassword;