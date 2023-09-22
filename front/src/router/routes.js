const routes = [{
    path: '',
    name: 'Main',
    component: () => import('../pages/MainPage')
}, {
    path: '/auth',
    component: () => import('../pages/AuthRoot'),
    children: [
        {
            path: '',
            name: 'Login',
            component: () => import('../pages/LoginPage'),
        }, {
            path: 'registration',
            name: 'Registration',
            component: () => import('../pages/RegistrationPage')
        }
    ]
}];

export default routes;