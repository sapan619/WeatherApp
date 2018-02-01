
import home from './components/home.vue';
import city from './components/city.vue';

export default [
    { path: '/', component: home},
    { path: '/city/:id', component: city}
]
