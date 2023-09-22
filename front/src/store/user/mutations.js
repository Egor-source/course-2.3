import router from '@/router';

export function setAccessToken (store, accessToken) {
    store.accessToken = accessToken;
}

export function setRefreshToken (store, refreshToken) {
    store.refreshToken = refreshToken;
}

export function setUser (store, userData) {
    store.id = userData.id;
    store.login = userData.login;
    store.createdAt = userData.createdAt;
    store.updatedAt = userData.updatedAt;
}

export function resetAuth (store) {
    store.id = null;
    store.login = null;
    store.createdAt = null;
    store.updatedAt = null;
    store.accessToken = null;
    store.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push({ name: 'Login' });
}