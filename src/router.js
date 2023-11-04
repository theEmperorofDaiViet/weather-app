import { createRouter, createWebHistory } from "vue-router";
import HomeContainer from "./components/HomeContainer.vue";
import WeatherContainer from "./components/WeatherContainer.vue";
import NotFoundContainer from "./components/NotFoundContainer.vue";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeContainer,
        },
        {
            path: '/weather/:id',
            component: WeatherContainer,
            props: true,
            beforeEnter: (to, from, next) => {
                const id = to.params.id;
                if(![0, 1, 2, 3, 4, 5, 6, 7].includes(Number(id))){
                    next("/not-found");
                }
                else{
                    next();
                }
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundContainer
        }
    ]
});

export default router;