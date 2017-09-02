export function isLoggedIn() {
    return Promise.resolve(true)
}

export function exchangeSSOToken(token) {
    return fetch('http://localhost:3031/ssoExchange', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(({ csrf }) => localStorage.setItem('csrf', csrf))
}

export function login(username, password) {
    return fetch('http://localhost:3031/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(({ csrf }) => localStorage.setItem('csrf', csrf))
}

export function logout() {
    localStorage.removeItem('csrf')
    return Promise.resolve()
}

export function signup(login, email, password, newsletter) {
    return fetch('http://localhost:3031/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login,
            email,
            password,
            newsletter
        }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(({ csrf }) => localStorage.setItem('csrf', csrf))
}