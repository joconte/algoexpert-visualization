import Vue from 'vue'
import VueRouter from 'vue-router'
import ChooseAlgo from "../components/ChooseAlgo";
import Fibonacci from "../components/Fibonacci";
import Permutations from "../components/Permutations";
import Powerset from "../components/Powerset";


Vue.use(VueRouter)

const routes = [
    {
        path: '/Home',
        name: 'Home',
        alias: '/',
        component: ChooseAlgo,
        meta: {
            title: 'Home - AlgoExpert visualization contest'
        }
    },
    {
        path: '/Fibonacci',
        name: 'Fibonacci',
        component: Fibonacci,
        meta: {
            title: 'Fibonacci - AlgoExpert visualization contest'
        }
    },
    {
        path: '/Permutations',
        name: 'Permutations',
        component: Permutations,
        meta: {
            title: 'Permutations - AlgoExpert visualization contest'
        }
    },
    {
        path: '/Powerset',
        name: 'Powerset',
        component: Powerset,
        meta: {
            title: 'Powerset - AlgoExpert visualization contest'
        }
    },
]

export const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
