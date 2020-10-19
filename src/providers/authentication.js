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

    if (data.profile === 'head') {
        return true
    } else {
        return false
    }
}

export function isEditor() {
    let data = JSON.parse(localStorage.getItem('user'))

    if (data.profile === 'editor') {
        return true
    } else {
        return false
    }
}

export async function submitLogin(email, password) {
    try {
        // let requestResponse = await axiosProvider.post('/model/sugestion/', object)

        let user = {"data": {
            "isLogged": true,
            "profile": "editor",
            "name": "Alana"
        }}
        console.log(">>>>user")
        console.log(user)
        return (user)

    } catch (error) {
        throw (error)
    }
}
