import axiosProvider from './config/axios'

export function isLogin() {
    let data = localStorage.getItem('user')

    if (data === null) {
        return false;
    } else {
        return true
    }
}

export function isHead() {
    let data = JSON.parse(localStorage.getItem('user'))

    if (data.role === 'head') {
        return true
    } else {
        return false
    }
}

export function isEditor() {
    let data = JSON.parse(localStorage.getItem('user'))

    if (data.role === 'editor') {
        return true
    } else {
        return false
    }
}

export async function submitLogin(user, password) {
    try {
        let requestResponse = await axiosProvider.post('/auth/login', {user, password})

        return (requestResponse)

    } catch (error) {
        throw (error)
    }
}
