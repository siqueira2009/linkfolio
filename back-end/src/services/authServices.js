import bcrypt from 'bcrypt'; // Importa a biblioteca de criptografia
import fs from 'fs';

// Função que compara a senha fornecida com a hasheada
async function verifyPassword(at, password) {
    
    try { // Tenta comparar as senhas usando o bcrypt
        const jsonUsersPath = 'src/data/users.json'; // Caminho do JSON 
        const users = JSON.parse(fs.readFileSync(jsonUsersPath)); // Dados do JSON
        const user = users.find(u => u.at == at); // Usuário do arroba

        // Vê se é igual
        // TRUE = IGUAL
        // FALSE = DIFERENTE
        const match = await bcrypt.compare(password, user.password);

        if (match) { // Se for igual, retorna true
            return true;
        } else { // Se for diferente, retorna false
            return false;
        }
    } catch (error) { // Caso dê ero na leitura, joga o erro para o controller
        throw error;
    }
}

// Exporta a função
export {
    verifyPassword
}