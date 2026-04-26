async function getUser(at) {
    const user = await fetch(`http://localhost:3000/user/${at}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!user.ok) {
        return null;
    }

    await fetch(`http://localhost:3000/user/${at}/views`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await user.json();

    return response;
}

async function updateUser(at, bodyData) {
    const parsedLinks = bodyData.customLinks ? JSON.parse(bodyData.customLinks) : []; 
    
    const data = {
        name: bodyData.name,
        pronouns: bodyData.pronouns,
        bio: bodyData.bio,
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

    try {
        const reponse = await fetch(`http://localhost:3000/user/${at}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        throw error;
    }
}

export {
    getUser,
    updateUser
}