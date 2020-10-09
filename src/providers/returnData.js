import axiosProvider from './config/axios';
import * as storage from './storage';

const dataInformation = 'returnData'

export function isLogin() {

    let data = storage.getItem(returnData);

    if (data === null) {
        return false;
    } else {
        return true
    }

}

export function verifyAuth(loginObj) {
    return axiosProvider.post('/auth', loginObj);
}

export async function saveLogin(object) {
    storage.storeItem(returnData, object);
}
