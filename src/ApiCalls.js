// const backendAPI = 'http://localhost:3000'
const backendAPI = 'https://backend-fitness-guru.herokuapp.com'

export function createToken(state) {
    return fetch(backendAPI+'/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)})
            .then(res => res.json())
}

export function createUser(state) {
    return fetch(backendAPI+'/users/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function createMeal(state) {
    return fetch(backendAPI+'/meals/',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function createUserWorkout(state) {
    return fetch(backendAPI+'/user_workouts/',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function getUserData(userId) {
    return fetch(backendAPI+'/users/'+userId)
    .then(res => res.json())
}

export function patchUserProfile(userId, state) {
    return fetch(backendAPI+'/users/'+userId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function patchUserSetting(userId, state) {
    return fetch(backendAPI+'/users/'+userId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(res => res.json())
}

export function deleteUser(userId) {
    return fetch(backendAPI+'/users/'+userId, {
        method: "DELETE"
      })
}

export function deleteRecord(endpoint,id) {
    return fetch(`${backendAPI}/${endpoint}/${id}`, {
        method: 'DELETE'
    })
}

export function fetchFood(searchValue) {
    return fetch(`https://api.edamam.com/api/food-database/parser?ingr=${searchValue}&app_id=a2fa636f&app_key=73b94865beb211abba81ba8d13b6a2a0%20`)
    .then(res => res.json())
}
