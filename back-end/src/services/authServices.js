import bcrypt from 'bcrypt';
import fs from 'fs';

async function verifyPassword(at, password) {
    const jsonUsersPath = 'src/data/users.json';

    try {
        const users = JSON.parse(fs.readFileSync(jsonUsersPath));
        const user = users.find(u => u.at == at);

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export {
    verifyPassword
}