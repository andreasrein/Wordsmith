import axios from 'axios'

export const sentence = {
  namespaced: true,
  state: {
    storedSentences: [],
    loadingSentences: false,
    sentenceErr: null
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
          console.log(e)
        })
    },
    postSentence ({commit, rootState, state}, payload) {
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
        .then(res => {
          console.log(res)
          // commit('SET_SENTENCES', res.data)
        })
        .catch(e => {
          commit('SET_SENTENCE_ERR', e)
          console.log(e)
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
    }
  }
}