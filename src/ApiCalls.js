const userURL = 'http://localhost:3000/users/'
const loginURL = 'http://localhost:3000/login'

export function createToken(state) {
    return fetch(loginURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)})
            .then(res => res.json())
}

export function createUser(state) {
    return fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function getUserData(userId) {
    return fetch(userURL+userId)
    .then(res => res.json())   
}

export function patchUserSetting(userId, state) {
    return fetch(userURL+userId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function deleteUser(userId) {
    return fetch(userURL+userId, {
        method: "DELETE"
      })
}