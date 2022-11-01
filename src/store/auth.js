import axios from 'axios'
import router from '@/router'

export const auth = {
  namespaced: true,
  state: {
    token: null,
    tokenPoll: null
  },
  actions: {
    login ({ commit, dispatch, rootState }, payload) {
      const headers = { 
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      axios.post(`${rootState.api}/login`, payload, headers)
        .then(res => {
          commit('SET_AUTH', res.data.token)
          dispatch('tokenRefresh')
        })
        .catch(e => {
          console.log(e)
        })
    },
    checkIfAuthorized ({ dispatch, commit }) {
      // JWT Decode method
      const hasTokenExpired = (token) => {
        // Decode JWT to json
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
  
        // Compare expire date to "now", convert to seconds
        const date = new Date()
        const now = Math.floor(date.getTime() / 1000)
        const tokenExp = JSON.parse(jsonPayload).exp
  
        if (now > tokenExp) {
          return true
        }
        console.log(`Token expires ${new Date(tokenExp * 1000)}`)
        return false
      }

      const token = localStorage.getItem('ws_token')
      if (token && !hasTokenExpired(token)) {
        commit('SET_AUTH', token)
        dispatch('tokenRefresh')
      } else {
        commit('LOGOUT')
      }
    },
    tokenRefresh ({state, commit}) {
      const hasTokenExpired = (token) => {
        // Decode JWT to json
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
  
        // Compare expire date to "now", convert to seconds
        const date = new Date()
        const now = Math.floor(date.getTime() / 1000)
        const tokenExp = JSON.parse(jsonPayload).exp
  
        if (now > tokenExp) {
          return true
        }
        return false
      }
      this.tokenPoll = setInterval(() => {
        console.log('Poll token')
        if (!state.token || hasTokenExpired(state.token)) {
          commit('LOGOUT')
        }
      }, 3000)
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
    SET_UNAUTH (state) {
      state.authData = 'FAIL'
    }
  }
}