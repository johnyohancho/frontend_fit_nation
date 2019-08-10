const userURL = 'https://backend-fitness-guru.herokuapp.com/users/'
const loginURL = 'https://backend-fitness-guru.herokuapp.com/login'

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
    return fetch('https://backend-fitness-guru.herokuapp.com/users', {
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