import { createStore } from "vuex"
import { auth } from './auth.js'
import { sentence } from './sentence.js'

export default createStore({
  state: {
    api: 'https://ws-api.alphadev.se'
  },
  modules: {
    auth,
    sentence
  }
})
