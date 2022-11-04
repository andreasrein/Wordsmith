import axios from 'axios'
import router from '@/router'
import { hasTokenExpired } from './plugins/checkTokenExpiration.js'

export const auth = {
  namespaced: true,
  state: {
    token: null,
    tokenPoll: null,
    loginErr: null,
    loadingLogin: false
  },
  actions: {
    login ({ commit, dispatch, rootState, state }, payload) {
      commit('SET_LOADING_LOGIN', true)
      if (state.loginErr) {
        commit('SET_UNAUTH', null)
      }
      const headers = { 
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      axios.post(`${rootState.api}/login`, payload, headers)
        .then(res => {
          commit('SET_AUTH', res.data.token)
          commit('SET_LOADING_LOGIN', false)
          dispatch('tokenRefresh')
        })
        .catch(e => {
          commit('SET_UNAUTH', e)
          commit('SET_LOADING_LOGIN', false)
          console.log(e)
        })
    },
    checkIfAuthorized ({ dispatch, commit }) {
      const token = localStorage.getItem('ws_token')

      if (token && !hasTokenExpired(token)) {
        commit('SET_AUTH', token)
        dispatch('tokenRefresh')
      } else {
        commit('LOGOUT')
      }
    },
    tokenRefresh ({state, commit}) {
      this.tokenPoll = setInterval(() => {
        if (!state.token || hasTokenExpired(state.token)) {
          commit('LOGOUT')
        }
      }, 30000)
    }
  },
  mutations: {
    LOGOUT (state) {
      // Remove LS and state, redirect and clear refresh
      clearInterval(this.tokenPoll)
      localStorage.removeItem('ws_token')
      state.token = null
      router.push('/login')
    },
    SET_AUTH (state, data) {
      // Set LS and state, redirect
      state.token = data
      localStorage.setItem('ws_token', data)
      router.push('/')
    },
    SET_UNAUTH (state, data) {
      state.loginErr = data
    },
    SET_LOADING_LOGIN (state, data) {
      state.loadingLogin = data
    }
  }
}