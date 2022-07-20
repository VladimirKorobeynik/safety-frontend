import { createApp } from 'vue'
import components from '@/components/common'
import i18n from './locales/i18n'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app.use(store).use(router).use(i18n).mount('#app');