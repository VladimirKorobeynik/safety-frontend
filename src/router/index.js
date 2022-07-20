import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import SignInPage from '../views/SignInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import DashboardPage from '../views/DashboardPage.vue'

const routes = [{
        path: '/',
        component: WelcomePage
    },
    {
        path: '/signIn',
        component: SignInPage,
        meta: { middlewareGuest: true }
    },
    {
        path: '/signUp',
        component: SignUpPage,
        meta: { middlewareGuest: true }
    },
    {
        path: '/dashboard',
        component: DashboardPage,
        meta: { middlewareAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

function isLoggedIn() {
    return localStorage.getItem("access_token") != null;
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.middlewareAuth)) {
        if (!isLoggedIn()) {
            next({
                path: '/signIn',
                query: { redirect: to.fullPath }
            });

            return;
        }
    }

    if (to.matched.some(record => record.meta.middlewareGuest)) {
        if (isLoggedIn()) {
            next({
                path: '/dashboard',
                query: { redirect: to.fullPath }
            });

            return;
        }
    }

    next();
});


export default router