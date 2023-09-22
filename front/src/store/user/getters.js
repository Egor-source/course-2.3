export function isAuth (store) {
    return !!store.accessToken;
}

export function getUser (store) {
    return {
        id: store.id,
        login: store.login,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
        accessToken: store.accessToken,
        refreshToken: store.refreshToken,
    };
}