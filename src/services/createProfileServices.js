// Pega a URL do backend nas variáveis do sistema
const BACKEND_URL = process.env.BACKEND_URL;

// Função de lógica de criação de perfil
async function createProfile(bodyData) {
    try { // Tenta requisitar o back-end para salvar os dados
        const parsedLinks = bodyData.customLinks ? JSON.parse(bodyData.customLinks) : []; 
    
        const data = {
            name: bodyData.name,
            pronouns: bodyData.pronouns,
            at: bodyData.at,
            bio: bodyData.bio,
            password: bodyData.password,
            color: bodyData.color,
            instagram: bodyData.instagram,
            linkedin: bodyData.linkedin,
            x: bodyData.x,
            github: bodyData.github,
            youtube: bodyData.youtube,
            discord: bodyData.discord,
            steam: bodyData.steam,
            facebook: bodyData.facebook,
            tiktok: bodyData.tiktok,
            links: parsedLinks
        }
        
        // Fetch na rota de salvar dados
        const response = await fetch(`${BACKEND_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return response.ok; // Retorna a resposta
    } catch (error) { // Caso dê erro no fetch, mostra o erro e joga ele para o controller
        console.error("Erro no Service [createProfile] ao tentar fazer fetch:", error);

        throw error;
    }
}

// Exporta as funções
export {
    createProfile
}