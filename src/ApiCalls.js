const userURL = 'http://localhost:3000/users/'

export function getUserData(userId) {
    return fetch(userURL+userId)
    .then(res => res.json())   
}

