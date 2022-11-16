import axios from 'axios'

export const sentence = {
  namespaced: true,
  state: {
    storedSentences: [],
    loadingSentences: false,
    sentenceErr: null,
    selectedSentences: []
  },
  actions: {
    getSentences ({commit, rootState, state}) {
      commit('SET_LOADING_SENTENCES', true)
      if (state.sentenceErr) {
        commit('SET_SENTENCE_ERR', null)
      }
      const headers = { 
        headers: {
          'Authorization': `Bearer ${rootState.auth.token}`,
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      axios.get(`${rootState.api}/sentence`, headers)
        .then(res => {
          commit('SET_SENTENCES', res.data)
          commit('SET_LOADING_SENTENCES', false)
        })
        .catch(e => {
          commit('SET_LOADING_SENTENCES', false)
          commit('SET_SENTENCE_ERR', e)
          console.warn(e)
        })
    },
    postSentence ({commit, dispatch, rootState, state}, payload) {
      if (state.sentenceErr) {
        commit('SET_SENTENCE_ERR', null)
      }
      const headers = { 
        headers: {
          'Authorization': `Bearer ${rootState.auth.token}`,
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      axios.post(`${rootState.api}/sentence`, payload, headers)
        .then(() => {
          dispatch('getSentences')
        })
        .catch(e => {
          commit('SET_SENTENCE_ERR', e)
          console.warn(e)
        })
    },
    postOrder ({rootState}, payload) {
      return new Promise((resolve, reject) => {
        const headers = {
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        axios.post(`${rootState.api}/order`, payload, headers)
          .then((res) => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  },
  mutations: {
    SET_SENTENCES (state, data) {
      state.storedSentences = data
    },
    SET_LOADING_SENTENCES (state, data) {
      state.loadingSentences = data
    },
    SET_SENTENCE_ERR (state, data) {
      state.sentenceErr = data
    },
    SET_SELECTED_SENTENCES (state, data) {
      state.selectedSentences = data
    }
  },
  getters: {
    getSelectedList (state) {
      return state.storedSentences.filter(element => state.selectedSentences.includes(element.id))
    }
  }
}