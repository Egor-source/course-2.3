import axiosInstance from '@/axios';

async function registrationAndLogin (commit, userData, eventName) {
    const { data } = await axiosInstance.post(`auth/${eventName}`, userData);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    commit('setUser', data);
    commit('setAccessToken', data.accessToken);
    commit('setRefreshToken', data.refreshToken);
    return data;
}

export async function registration ({ commit }, userData) {
    return await registrationAndLogin(commit, userData, 'registration');
}

export async function login ({ commit }, userData) {
    return await registrationAndLogin(commit, userData, 'login');
}

export async function loadUser ({
                                    commit,
                                    getters,
                                }) {
    try {
        const { data } = await axiosInstance('/auth/getAuthUser');
        commit('setUser', data);
    } catch (e) {
        const error = e.response.data?.error;
        if (error.message === 'jwt expired') {
            try {
                const { refreshToken } = getters['getUser'];
                const { data } = await axiosInstance.post('auth/refreshToken', {
                    token: refreshToken,
                });

                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                commit('setUser', data);
                commit('setAccessToken', data.accessToken);
                commit('setRefreshToken', data.refreshToken);
            } catch (e) {
                commit('resetAuth');
            }
        } else {
            commit('resetAuth');
        }
    }

}