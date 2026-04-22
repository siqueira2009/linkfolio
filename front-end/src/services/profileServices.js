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

export {
    getUser
}