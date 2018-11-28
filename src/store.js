import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    name: '',
    school: '',
    work: '',
    avatar: '',
    description: '',
    adminCode: ''
  },
  mutations: {
    setUserProfile (state, user) {
      state.id = user.id
      state.username = user.username
      state.password = user.password
      state.email = user.email
      state.phone = user.phone
      state.name = user.name
      state.school = user.school
      state.work = user.work
      state.avatar = user.avatar
      state.description = user.description
      state.adminCode = user.adminCode
    },
    setAvatarName (state, name) {
      state.avatar = name
    }
  },
  actions: {
    setUserProfile (ctx, user) {
      ctx.commit('setUserProfile', user)
    },
    setAvatarName (ctx, name) {
      ctx.commit('setAvatarName', name)
    }
  }
})
