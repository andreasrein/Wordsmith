import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from "vuex";
import './assets/main.css'

import auth from './store/auth.js'
import sentences from './store/auth.js'

const app = createApp(App)
const store = createStore({
  /* state, actions, mutations */
  modules: {
    auth,
    sentences
  },
});

app.use(store);
app.use(router)

app.mount('#app')
